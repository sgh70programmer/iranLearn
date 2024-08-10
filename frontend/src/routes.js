import Index from "./Pages/Index/Index"
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo"
import Category from "./Pages/Category/Category"
import CourseInfo from "./Pages/CourseInfo/CourseInfo"
import Courses from "./Pages/Courses/Courses"
import Articles from "./Pages/Articles/Articles"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Contact from "./Pages/Contact/Contact"
import Search from "./Pages/Search/Search"
import Session from './Pages/Session/Session'
import AdminPanel from "./Pages/AdminPanel/IndexAdmin"
import Users from "./Pages/AdminPanel/Users/Users"
import AdminCourses from "./Pages/AdminPanel/Courses/Courses"
import Menus from "./Pages/AdminPanel/Menus/Menus"
import AdminArticles from "./Pages/AdminPanel/Articles/Articles"
import Draft from "./Pages/AdminPanel/Articles/Draft";
import AdminCategory from "./Pages/AdminPanel/Category/Category";
import AdminContact from "./Pages/AdminPanel/Contact/Contact"
import Sessions from "./Pages/AdminPanel/Sessions/Sessions";
import Comments from "./Pages/AdminPanel/Comments/Comments";
import Offs from "./Pages/AdminPanel/Offs/Offs";
import Discounts from "./Pages/AdminPanel/Discounts/Discounts";
import Tickets from "./Pages/AdminPanel/Tickets/Tickets";
import PAdminIndex from "./Pages/AdminPanel/Index/Index";
import UserPanel from "./Pages/UserPanel/Index";
import UserPanelIndex from "./Pages/UserPanel/Index/Index";
import UserPanelOrder from "./Pages/UserPanel/Orders/Orders";
import Order from "./Pages/UserPanel/Orders/Order"
import UserPanelCourses from "./Pages/UserPanel/Courses/Courses";
import SendTicket from "./Pages/UserPanel/Tickets/SendTicket";
import UserPanelTickets from "./Pages/UserPanel/Tickets/Tickets";
import UserPanelTicketAnswer from "./Pages/UserPanel/Tickets/TicketAnswer";
import UserPanelEditAccount from "./Pages/UserPanel/EditAccount/EditAccount";
import PAdminPrivate from "./Pages/AdminPanel/Privates/PAdminPrivate";

let routes = [
  { path: "/", element: <Index /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/course-info/:courseName/:page", element: <CourseInfo /> },
  { path: '/courses/:page', element: <Courses /> },
  { path: '/articles/:page', element: <Articles /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/contact', element: <Contact /> },
  { path: '/search/:value', element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },

  {
    path: "/p-admin/*",
    element: 
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ,
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContact /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
      { path: "discounts", element: <Discounts /> },
      { path: "tickets", element: <Tickets /> },
    ],
  },

  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <UserPanelOrder /> },
      { path: "orders/order/:orderID", element: <Order /> },
      { path: "buyed", element: <UserPanelCourses /> },
      { path: "tickets", element: <UserPanelTickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:id", element: <UserPanelTicketAnswer /> },
      { path: "edit-account", element: <UserPanelEditAccount /> },
    ],
  },

]

export default routes