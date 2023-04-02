import { redirect } from "react-router-dom";

export function checkAuth() {
  const userData = JSON.parse(localStorage.getItem("userData")) ?? undefined;
  if (!userData) {
    alert("Login to access these features 🚫 ");
    return redirect("/login");
  }
  return 0;
}
export function checkAdmin() {
  const userData = JSON.parse(localStorage.getItem("userData")) ?? undefined;
    console.log(userData?.isAdmin);
  if (!userData || !userData?.isAdmin) {
    alert("You dont't have admin access 🚫 ");
    return redirect("/login");
  }
  return 0;
}

export function getAuth() {}
