import { useEffect, useState } from "react";
import { CategoryItem, WrapperCategory } from "./style";
import * as TypeService from "../../services/TypeService";
export default function CategoryComponent() {
  const [listType, setListType] = useState("");
  useEffect(() => {
    handleGetAllType();
  }, []);

  const handleGetAllType = async () => {
    try {
      const res = await TypeService.getAllType();
      setListType(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderType = () => {
    console.log(listType);
    if (listType) {
      return listType.map((type, index) => {
        return (
          <CategoryItem key={index} to={""}>
            {type.name}
          </CategoryItem>
        );
      });
    }
  };

  return (
    <WrapperCategory>
      <h5>Categories</h5>
      {renderType()}
    </WrapperCategory>
  );
}
