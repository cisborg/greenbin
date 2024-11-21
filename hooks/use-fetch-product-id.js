import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/actions/products";

const useFetchProductById = (id) => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id]);

  return { product, loading, error };
};
