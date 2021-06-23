import * as React from "react"
import { Link } from "gatsby"
import { Layout } from "../components/layout"
import { StoreContext } from "../context/store-context"
import { LineItem } from "../components/line-item"
import { formatPrice } from "../utils/format-price"
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  title,
} from "./cart.module.css"

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <Layout>
      <div className={wrap}>
        {emptyCart ? (
          <div className={emptyStateContainer}>
            <h1 className={emptyStateHeading}>Tu carrito está vacío</h1>
            <p>
              Parece que todavía no encuentras algo que te guste. Entendemos que
              a veces es difícil elegir — quizás esto ayude:
            </p>
            <Link to="/search?s=BEST_SELLING" className={emptyStateLink}>
              Ver productos en tendencia
            </Link>
          </div>
        ) : (
          <>
            <h1 className={title}>Tu Carrito</h1>
            <table className={table}>
              <thead>
                <tr>
                  <th className={imageHeader}>Imagen</th>
                  <th className={productHeader}>Producto</th>
                  <th className={collapseColumn}>Precio</th>
                  <th>Cantidad</th>
                  <th className={[totals, collapseColumn].join(" ")}>Total</th>
                </tr>
              </thead>
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Subtotal</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </td>
                </tr>
                {checkout.totalTaxV2.amount > 0 && (
                  <tr className={summary}>
                    <td className={collapseColumn}></td>
                    <td className={collapseColumn}></td>
                    <td className={collapseColumn}></td>
                    <td className={labelColumn}>Impuestos</td>
                    <td className={totals}>
                      {formatPrice(
                        checkout.totalTaxV2.currencyCode,
                        checkout.totalTaxV2.amount
                      )}
                    </td>
                  </tr>
                )}
                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Envío</td>
                  <td className={totals}>Cálculo Pendiente</td>
                </tr>

                <tr className={grandTotal}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Precio Total</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={checkoutButton}
            >
              Finalizar Pedido
            </button>
          </>
        )}
      </div>
    </Layout>
  )
}
