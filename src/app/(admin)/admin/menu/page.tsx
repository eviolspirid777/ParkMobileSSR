"use client";
import { apiClient } from "@/api/ApiClient";
import { DataType } from "@/Store/ShopBucket";
import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Table,
  TableColumnsType,
  Upload,
  UploadProps,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Menu.module.scss";
import { CardItemDTO } from "@/Entities/CardItemDTO";
import { CardType } from "@/Types/CardType";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type FormItemChange = {
  article: string;
  description: string;
  discountPrice: string;
  name: string;
  price: string;
  stock: number;
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
  const { data: itemsList, refetch: refetchItemsList } = useQuery({
    queryKey: ["itemsList"],
    queryFn: () => apiClient.GetItems(0, 100),
  });

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(itemsList ? itemsList.items : data);
  useEffect(() => {
    if (itemsList?.items) {
      setItems(itemsList?.items);
    }
  }, [itemsList]);

  const [selectedItem, setSelectedItem] = useState<CardType>();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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

  const handleRowClick = (record: CardType) => {
    setSelectedItem(record);
    setOpen(true);
  };

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleFinishForm = async (newItem: FormItemChange) => {
    const mappedItem: CardItemDTO = {
      id: selectedItem?.id!,
      name: newItem.name,
      price: newItem.price,
      stock: newItem.stock,
      article: newItem.article,
      discountPrice: newItem.discountPrice,
      description: newItem.description,
      categoryId: 12,
      itemBrandId: 8,
      image: "",
      options: "",
    };
    try {
      await apiClient.UpdateItem(mappedItem);
      refetchItemsList();
    } catch (error) {
      message.info("Ошибка с запросом!");
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={items as DataType[]}
        onRow={(record) => ({
          onClick: handleRowClick.bind(
            this,
            itemsList?.items.find((item) => item.id === +record.key)!
          ),
        })}
      />
      {createPortal(
        <Modal
          open={open}
          onCancel={setOpen.bind(this, false)}
          onClose={setOpen.bind(this, false)}
          footer={null}
          width={900}
        >
          <Form
            key={`${selectedItem?.name}`}
            layout="vertical"
            initialValues={selectedItem}
            onFinish={handleFinishForm}
          >
            <div className={styles["form-grid-block"]}>
              <div className={`${styles["image-form-item"]} edit-item-image`}>
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
              </div>
              <div>
                <Form.Item label="Название товара" name="name">
                  <Input placeholder="Название товара" />
                </Form.Item>
                <Form.Item label="На складе" name="stock">
                  <Input placeholder="Колличество на складе" />
                </Form.Item>
                <Form.Item label="Артикул" name="article">
                  <Input placeholder="Артикул" />
                </Form.Item>
                <Form.Item label="Цена" name="price">
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
                    <Button onClick={setOpen.bind(null, false)}>
                      Отменить
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Сохранить
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Modal>,
        document.body
      )}
    </div>
  );
};

export default MenuPage;
