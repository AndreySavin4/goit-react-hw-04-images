export const ServiseApi = async (valueForm, page = 1) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_URL = '34705867-b6a2f9003b4e51dcc54f2c2fa';
  const res = await fetch(
    `${BASE_URL}?q=${valueForm}&page=${page}&key=${KEY_URL}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await res.json();
};
