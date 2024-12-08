"use client";
import { apiClient } from "@/api/ApiClient";
import { DataType } from "@/Store/ShopBucket";
import {
  Button,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Table,
  TableColumnsType,
  Upload,
  UploadProps,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import styles from "./Menu.module.scss";
import { CardItemDTO } from "@/Entities/CardItemDTO";
import { CardType } from "@/Types/CardType";
import { useForm } from "antd/es/form/Form";
import { useAtom } from "jotai";
import { categoriesAtom } from "@/Store/CategoriesStore";
import { brandsAtom } from "@/Store/BrandsStore";
import { useGetItems } from "@/hooks/useGetItems";
import { useUpdatePhoto } from "@/hooks/useUpdatePhoto";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetBrands } from "@/hooks/useGetBrands";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type FormItemChange = {
  article: string;
  description: string;
  discountPrice: string;
  name: string;
  price: string;
  stock: number;
  categoryId: number;
  brandId: number;
};

const columns: TableColumnsType<DataType> = [
  {
    title: "Изображение",
    dataIndex: "image",
    key: "image",
    width: 100,
    render: (image: string) => (
      <img src={`data:image/jpeg;base64,${image}`} width={70} />
    ),
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Артикул",
    dataIndex: "article",
    key: "article",
  },
  {
    title: "Колличество",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Iphone",
    article: "ARTICLE",
    count: 10,
    image: "IMAGE",
    price: "23 000",
    color: "black",
    memory: "2000",
  },
];

const MenuPage = () => {
  const { itemsList, itemsListIsSuccess, refetchItemsList } = useGetItems();
  const { updatePhoto } = useUpdatePhoto();
  const { deleteItem } = useDeleteItem();
  useGetCategories();
  useGetBrands();

  const [categories] = useAtom(categoriesAtom);
  const categoriesOptions = categories?.map((el) => ({
    label: el.name,
    value: el.id,
  }));
  const [brands] = useAtom(brandsAtom);
  const brandsOptions = brands?.map((el) => ({
    label: el.name,
    value: el.id,
  }));

  const [form] = useForm();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(itemsList ? itemsList.items : data);
  useEffect(() => {
    if (itemsList?.items) {
      setItems(itemsList?.items);
    }
  }, [itemsList]);

  const [selectedItem, setSelectedItem] = useState<CardType | null>();
  useEffect(() => {
    if (selectedItem) {
      setSelectedItem(
        itemsList?.items.find((item) => item.id === selectedItem.id)
      );
    }
  }, [itemsList]);

  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  );

  useEffect(() => {
    if (itemsList) {
      setItems(
        itemsList.items.map((el) => {
          return {
            key: el.id,
            name: el.name,
            article: el.article,
            count: el.stock,
            price: el.price,
            image: el.image,
            color: "",
            memory: "",
          };
        }) as unknown as DataType[]
      );
    }
  }, [itemsList]);

  const handleRowClick = (record: CardType | null) => {
    console.log(record);
    setSelectedItem(record);
    setOpen(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setOpen(false);
    setSelectedItem(null);
  };

  const handleAddItem = () => {
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteItem(id);
    setTimeout(() => {
      refetchItemsList();
      setOpen(false);
      setSelectedItem(null);
    }, 2000);
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      try {
        const blob = await fileToBlob(info.file.originFileObj as FileType);

        const formData = new FormData();
        formData.append("image", blob);
        formData.append("id", selectedItem?.id?.toString() ?? "");
        updatePhoto(formData);
      } finally {
        setLoading(false);
        setTimeout(() => {
          refetchItemsList();
        }, 2000);
      }
    } else if (info.file.status === "error") {
      setLoading(false);
    }
  };

  const fileToBlob = async (file: FileType): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([new Uint8Array(arrayBuffer)], {
          type: file.type,
        });
        resolve(blob);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFinishForm = async (newItem: FormItemChange) => {
    //POST
    if (selectedItem) {
      const mappedItem: CardItemDTO = {
        id: selectedItem?.id ?? 0,
        name: newItem.name,
        price: newItem.price,
        stock: newItem.stock,
        article: newItem.article,
        discountPrice: newItem.discountPrice,
        description: newItem.description,
        categoryId: newItem.categoryId,
        itemBrandId: newItem.brandId,
      };
      try {
        await apiClient.UpdateItem(mappedItem);
        setTimeout(() => {
          refetchItemsList();
        }, 2000);
        refetchItemsList();
      } catch (error) {
        message.info(`Ошибка с запросом! ${error}`);
      } finally {
        handleCloseModal();
      }
    }
    //ADD
    else {
      const mappedItem: Omit<CardItemDTO, "id"> = {
        name: newItem.name,
        price: newItem.price,
        stock: newItem.stock,
        article: newItem.article,
        discountPrice: newItem.discountPrice,
        description: newItem.description,
        categoryId: newItem.categoryId,
        itemBrandId: newItem.brandId,
      };
      try {
        await apiClient.AddItem(mappedItem);
        refetchItemsList();
      } catch (error) {
        message.info(`Ошибка с запросом! ${error}`);
      } finally {
        handleCloseModal();
      }
    }
  };

  return (
    <div className={styles["menu-items-list"]}>
      <Button
        className={styles["menu-items-list-button"]}
        onClick={handleAddItem}
      >
        Добавить товар
      </Button>
      <Table
        key={`${itemsListIsSuccess}`}
        columns={columns}
        dataSource={items as DataType[]}
        onRow={(record) => ({
          onClick: handleRowClick.bind(
            this,
            itemsList?.items.find((item) => item.id === +record.key) ?? null
          ),
        })}
      />
      <Modal
        open={open}
        onCancel={handleCloseModal.bind(this)}
        onClose={handleCloseModal.bind(this)}
        footer={null}
        width={900}
        centered
      >
        <Form
          key={`${selectedItem?.name}`}
          form={form}
          layout="vertical"
          initialValues={selectedItem ? selectedItem : {}}
          onFinish={handleFinishForm}
        >
          <div className={styles["form-grid-block"]}>
            <div className={`${styles["image-form-item"]} edit-item-image`}>
              {selectedItem && (
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  {selectedItem?.image ? (
                    <img
                      src={`data:image/jpeg;base64,${selectedItem?.image}`}
                      alt=""
                      width={300}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
            </div>
            <div>
              <Form.Item
                label="Название товара"
                name="name"
                rules={[
                  { required: true, message: "Введите название товара!" },
                ]}
              >
                <Input placeholder="Название товара" />
              </Form.Item>
              <Form.Item label="Брэнд" name="brandId">
                <Select placeholder="Брэнд" options={brandsOptions} />
              </Form.Item>
              <Form.Item label="Категория" name="categoryId">
                <Select placeholder="Категория" options={categoriesOptions} />
              </Form.Item>
              <Form.Item
                label="На складе"
                name="stock"
                rules={[
                  {
                    required: true,
                    message: "Введите кол-во товара на складе!",
                  },
                ]}
              >
                <Input placeholder="Колличество на складе" />
              </Form.Item>
              <Form.Item
                label="Артикул"
                name="article"
                rules={[
                  {
                    required: true,
                    message: "Введите артикул товара!",
                  },
                ]}
              >
                <Input placeholder="Артикул" />
              </Form.Item>
              <Form.Item
                label="Цена"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Введите цену на товар!",
                  },
                ]}
              >
                <Input placeholder="Цена" />
              </Form.Item>
              <Form.Item label="Цена со скидкой" name="discountPrice">
                <Input placeholder="Цена со скидкой" />
              </Form.Item>
              <Form.Item label="Описание товара" name="description">
                <Input.TextArea
                  placeholder="Описание товара"
                  rows={7}
                  autoSize={{ maxRows: 7, minRows: 7 }}
                />
              </Form.Item>
              <Form.Item>
                <div className={styles["button-block"]}>
                  <Popconfirm
                    title="Удалить"
                    description="Вы уверены, что хотите удалить товар?"
                    onConfirm={handleDelete.bind(this, selectedItem?.id ?? -1)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button
                      color="danger"
                      variant="solid"
                      style={{
                        marginRight: "36%",
                      }}
                    >
                      Удалить
                    </Button>
                  </Popconfirm>
                  <Button onClick={setOpen.bind(null, false)}>Отменить</Button>
                  <Button type="primary" htmlType="submit">
                    Сохранить
                  </Button>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuPage;
