import { useEffect, useState } from "react";
import {Text} from "react-native"
import { supabase } from "./supabase";
import { useAuthentication } from "./useAuthentication";

export function findJoinStatus() {
  const [joinStatus, setJoinStatus] = useState(true);
  const { user } = useAuthentication();

  useEffect(() => {

    async function fetchJoinStatus() {
      if (user === null) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("joined_snaptogether")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("Join status fetch failure");
      } else {
        setJoinStatus(data.joined_snaptogether)
        // console.log("From hook", data.joined_snaptogether)
      }
    }

    fetchJoinStatus();
  }, [user]);

  return joinStatus;
}
