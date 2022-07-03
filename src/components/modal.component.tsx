import { Box, Modal } from "@material-ui/core";
import { Product } from "../types/category.interface";

type ModalProps = {
  open: boolean;
  product?: Product;
  onClose: () => void;
};
const ModalComponent = ({ open, product, onClose }: ModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
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
              />
            </div>
          </div>
          <span className="modal__product-abstract">{product?.abstract}</span>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
