import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getDownloadPath } from "./download-helper"

export interface OrderItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
  downloadLink: string
  category: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  date: string
  orderNumber: string
}

interface OrdersStore {
  orders: Order[]
  addOrder: (items: Omit<OrderItem, "downloadLink">[], total: number) => Order
  getOrder: (orderId: string) => Order | undefined
  getAllOrders: () => Order[]
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (items, total) => {
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        const order: Order = {
          id: Date.now().toString(),
          items: items.map(item => ({
            ...item,
            downloadLink: getDownloadPath(item.title, item.category),
          })),
          total,
          date: new Date().toISOString(),
          orderNumber,
        }
        
        set((state) => ({
          orders: [order, ...state.orders],
        }))
        
        return order
      },
      getOrder: (orderId) => {
        const state = get()
        return state.orders.find((o) => o.id === orderId)
      },
      getAllOrders: () => {
        const state = get()
        return state.orders
      },
    }),
    {
      name: "orders-storage",
    },
  ),
)

