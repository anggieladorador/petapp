import { Box, Modal } from "@material-ui/core";
import { useState } from "react";
import { Product } from "../types/category.interface";
import Button from "./Button.component";

type ModalProps = {
  open: boolean;
  product: Product;
  onClose: () => void;
  addProduct: (product: Product) => void;
};
const ModalComponent = ({ open, product, onClose, addProduct }: ModalProps) => {
  const [qty, setQty] = useState(1);

  const handleAddingProduct = () => {
    addProduct({ ...product, qty });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className="modal__container">
          <h2>Producto Agregado</h2>
          <div className="modal__body">
            <div className="modal__image--container">
              <img src={product?.photo} alt={product?.name} />
            </div>
            <div className="modal__product-detail">
              <span className="product__text product__name-text">
                {product?.name}
              </span>
              <span className="product__text">cod: {product?.code}</span>
              <span className="product__text">{product?.price}</span>
              <div className="modal__action">
                <span>Cantidad:</span>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setQty(+e.target.value)}
                />
              </div>
            </div>
            <span className="modal__product-abstract">{product?.abstract}</span>
          </div>
          <div className="modal__footer">
            <Button text="Seguir comprando" onClick={onClose} />
            <Button text="Agregar al carro" onClick={handleAddingProduct} />
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ModalComponent;
