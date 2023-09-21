"use client"

import  NavBar  from "../../components/nav";
import { useEffect } from "react";
import { useAuth } from "../../../firebase/auth";
import { useRouter } from "next/navigation";



export default function Dashboard() {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
		if (!isLoading && !authUser) router.push("/");
	}, [authUser, isLoading]);
  
  return(
    <NavBar/>
   
  );
}