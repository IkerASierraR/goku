import React from "react";
import { AdminDashboard } from "./AdminDashboard";

type DashboardProps = React.ComponentProps<typeof AdminDashboard>;

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return <AdminDashboard user={user} />;
};
