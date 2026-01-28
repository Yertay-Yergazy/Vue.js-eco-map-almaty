import axios from "axios";

const API_BASE = "http://localhost:8000";

export async function fetchWaterObjects() {
  const res = await axios.get(`${API_BASE}/water-objects`);
  return res.data;
}

export async function searchWaterObjects(query) {
  const res = await axios.get(
    `${API_BASE}/water-objects/search?query=${encodeURIComponent(query)}`,
  );
  return res.data;
}

export async function fetchWaterQuality(id) {
  const res = await axios.get(`${API_BASE}/water-objects/${id}`);
  return res.data;
}
