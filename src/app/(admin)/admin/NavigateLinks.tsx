import { MenuProps } from "antd";
import React from "react";

import { LogoutOutlined } from "@ant-design/icons";

export const navLinks: MenuProps["items"] = [
  {
    key: "items",
    icon: <i className="fa-solid fa-boxes-stacked" />,
    label: "Товары",
  },
  {
    key: "brands",
    icon: <i className="fa-solid fa-table" />,
    label: "Брэнды",
  },
  {
    key: "categories",
    icon: <i className="fa-solid fa-list" />,
    label: "Категории",
  },
  //   {
  //     key: "zones",
  //     icon: <i className="fa-solid fa-layer-group" />,
  //     label: "Зоны",
  //     children: [
  //       {
  //         key: "/zone-templates",
  //         icon: <i className="fa solid fa-square-dashed" />,
  //         label: "Шаблоны зон",
  //       },
  //       {
  //         key: "/zone-devices",
  //         icon: <i className="fas fa-laptop-medical" />,
  //         label: "Устройства",
  //       },
  //     ],
  //   },
];

export const bottomMenu: MenuProps["items"] = [
  { key: "/admin", icon: React.createElement(LogoutOutlined), label: "Выйти" },
];
