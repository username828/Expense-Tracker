// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearNotification } from '../../redux/notificationSlice'

// const NotificationList = () => {
//   const notifications = useSelector((state) => state.notifications.notifications);
//   const dispatch = useDispatch();

//   const handleClearNotification = (id) => {
//     dispatch(clearNotification(id));
//   };

//   return (
//     <div className="p-4">
//       <h3 className="text-lg font-semibold">Notifications</h3>
//       <ul className="mt-4 space-y-2">
//         {notifications.length === 0 ? (
//           <li>No notifications yet.</li>
//         ) : (
//           notifications.map((notification) => (
//             <li key={notification.id} className="flex justify-between items-center p-2 bg-gray-200 rounded-md">
//               <span>{notification.message}</span>
//               <button
//                 onClick={() => handleClearNotification(notification.id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 X
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default NotificationList;
