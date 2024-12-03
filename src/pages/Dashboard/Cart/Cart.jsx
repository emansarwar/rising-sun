// import React from 'react'

import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosCqre from "../../../hooks/useAxiosCqre";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  // console.log(cart.length);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosCqre = useAxiosCqre();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosCqre.delete(`/carts/${id}`)
        .then((res) => {
          console.log('delete',res)
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="w-full">
      <div className="flex justify-around">
        <h2 className="text-4xl">Items: {cart.length}</h2>
        <h2 className="text-4xl">Total Price: {totalPrice}</h2>
        {
          cart.length ?
          <Link to="/dashboard/payment">
        <button className="px-10 btn btn-primary">Pay</button>
        </Link> :
        <button disabled className="btn btn-primary">Pay</button>
        }
        
        
      </div>
      {/* <div className="w-full overflow-x-auto"> */}
      <div className="my-5 overflow-x-auto">
        <table className="w-full table">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>

                <td>{item.name}</td>
                <td>${item.price}</td>
                <th>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg">
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;