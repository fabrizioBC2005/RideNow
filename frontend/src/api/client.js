// ============================================
//  RideNow — Cliente HTTP base (fetch + JWT automático)
// ============================================

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("ridenow_token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.mensaje || "Error en la solicitud");
  }

  return data;
}

export const api = {
  get:    (url)         => request(url, { method: "GET" }),
  post:   (url, body)   => request(url, { method: "POST",   body: JSON.stringify(body) }),
  put:    (url, body)   => request(url, { method: "PUT",    body: JSON.stringify(body) }),
  delete: (url)         => request(url, { method: "DELETE" }),
};
