"use client";
import { Button, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";

import styles from "./Menu.module.scss";
import { useAtom } from "jotai";
import { categoriesAtom } from "@/Store/CategoriesStore";
import { brandsAtom } from "@/Store/BrandsStore";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetBrands } from "@/hooks/useGetBrands";
import { ModalWindow } from "./ModalWindow/ModalWindow";
import { useGetItemsAdmin } from "@/hooks/useGetItemsAdmin";
import { CardTypeAdmin } from "@/Types/CardTypeAdmin";
import { AggregationColor } from "antd/es/color-picker/color";

export type FormItemChange = {
  article: string;
  description: string;
  discountPrice: string;
  name: string;
  price: string;
  stock: number;
  categoryId: number;
  brandId: number;
  optionName?: string;
  optionValue: string | AggregationColor;
};

type DataType = {
  key: number;
  image: string;
  name: string;
  count: number;
  price: string;
  article: string;
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

export const MenuPage = () => {
  const { itemsList, itemsListIsSuccess, refetchItemsList } =
    useGetItemsAdmin();
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

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(itemsList?.items);
  useEffect(() => {
    if (itemsList?.items) {
      setItems(itemsList?.items);
    }
  }, [itemsList]);

  const [selectedItem, setSelectedItem] = useState<CardTypeAdmin | null>();
  useEffect(() => {
    if (selectedItem) {
      setSelectedItem(
        itemsList?.items.find((item) => item.id === selectedItem.id)
      );
    }
  }, [itemsList]);

  useEffect(() => {
    if (itemsList) {
      setItems(
        itemsList.items.map((el) => {
          return {
            key: el.id!,
            name: el.name!,
            article: el.article!,
            count: el.stock!,
            price: el.price!,
            image: el.image!,
          };
        })
      );
    }
  }, [itemsList]);

  const handleRowClick = (record: CardTypeAdmin | null) => {
    console.log(record);
    setSelectedItem(record);
    setOpen(true);
  };

  const handleCloseModal = () => {
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
        dataSource={items}
        onRow={(record) => ({
          onClick: handleRowClick.bind(
            this,
            itemsList?.items.find((item) => item.id! === +record.key) ?? null
          ),
        })}
      />
      <ModalWindow
        brandsOptions={brandsOptions!}
        categoriesOptions={categoriesOptions!}
        closeModal={handleCloseModal}
        handleDelete={handleDelete}
        open={open}
        selectedItem={selectedItem!}
      />
    </div>
  );
};
