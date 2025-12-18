import React, { useState } from "react";
import { useLocalStorage } from "hooks";
import { Icon } from "../Icon";
import { SvgIcon } from "../SvgIcon";
import { cn } from "../utils/cn";
import { Item, SidebarItem } from "./Item";
import "./Sidebar.scss";

export type SidebarProps = {
  className?: string;
  items: SidebarItem[];
  onItemClick?: (item: SidebarItem, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

const block = cn("sidebar");

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { className, items, onItemClick } = props;

  const [collapsed, setCollapsed] = useLocalStorage("collapsed", false);
  const [selectedItemId, setSelectedItemId] = useState(items[0].id);

  const handleItemClick = (
    item: SidebarItem,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    onItemClick?.(item, event);
    return !item.children && setSelectedItemId(item.id);
  };

  return (
    <nav
      className={block(
        {
          collapsed: collapsed,
        },
        className,
      )}
    >
      <div className={block("header")}>
        <div className={block("logo")}></div>
        <button className={block("toggle")} onClick={() => setCollapsed((prev) => !prev)}>
          <Icon className={block("toggle-icon")} data={SvgIcon} />
        </button>
      </div>
      <ul className={block("list")}>
        {items.map((item, index) => (
          <Item
            item={item}
            collapsed={collapsed}
            selectedItemId={selectedItemId}
            onItemClick={handleItemClick}
            key={index}
          />
        ))}
      </ul>
    </nav>
  );
};
