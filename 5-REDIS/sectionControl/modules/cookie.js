async function haveCookie(req, res, cookie) {
  const key = req.cookies[cookie];
  if (key) {
    console.log("Ja havia cookie", key);
    res.redirect("/shop");
    return;
  }
  return false;
}

async function getCookie(req, res, cookie) {
  const key = req.cookies[cookie];
  if (key) {
    res.cookie(key, cookie);
    return;
  }
  return false;
}

async function setCookie(req, res, key, value) {
  console.log("Logado no redis mas sem cookie");
  console.log(isLogged);
  res
    .cookie(key, value, {
      maxAge: 3600000,
      httpOnly: true,
    })
    .send(value);
  return;
}

async function eraseCookie(req, res, key) {
  res.clearCookie(key).send(`cookie ${key} apagado com sucesso`);
}

async function addToCart(req, res, product, number) {
  const data = await getCookie(req, res, "products").split("--");
  const array = [...data];
  array.push(`${product}-${number}`);
  res
    .cookie(key, array.join("--"), {
      maxAge: 3600000,
      httpOnly: true,
    })
    .json(array);
  return;
}

module.exports = { haveCookie, getCookie, setCookie, eraseCookie, addToCart };
