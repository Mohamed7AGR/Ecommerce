import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

export default function Allorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const{userData}=useContext(authContext)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userData?.id || !localStorage.getItem('userToken')) {
            setLoading(false);
            return;
          }
        const token = localStorage.getItem('userToken');
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`,
          {
            headers: {
              token,
            },
          }
        );
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-600">No orders found</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Total: ${order.totalOrderPrice}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-b">
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p>{order.shippingAddress.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Details</p>
                    <p>{order.shippingAddress.details}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="space-y-4">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center">
                      <img 
                        src={item.product.imageCover} 
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium">{item.product.title}</h4>
                        <p className="text-sm text-gray-500">
                          {item.product.brand.name} • {item.product.category.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>${item.price}</p>
                        <p className="text-sm text-gray-500">Qty: {item.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Payment Method: {order.paymentMethodType === 'cash' ? 'Cash on Delivery' : 'Online'}
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}