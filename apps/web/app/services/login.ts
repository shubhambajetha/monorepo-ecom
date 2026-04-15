import { API_BASE } from "../lib/config";
import { API_ENDPOINTS } from "../constants";


type SignupPayload = {
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    role?:string
}

type SignupResponse = {
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
};
export const signup = async (
  data: SignupPayload
): Promise<SignupResponse> => {
  const res = await fetch(`${API_BASE}${API_ENDPOINTS.SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMessage = "Signup failed";

    try {
      const error = await res.json();
      errorMessage = error?.message || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return res.json();
};

