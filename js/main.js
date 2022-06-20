const template = document.querySelector(".template").content
const list = document.querySelector(".list")
const count = document.querySelector(".count")
const elCardsFrgament = document.createDocumentFragment()

// Add product elements
const newProductForm = document.querySelector("#form-Product")
const elSelect = document.querySelector("#product-manufacturer")
const newProductTitle = document.querySelector("#product-title")
const newProductPrice = document.querySelector("#price")
const newProductBenefits = document.querySelector("#benefits")

// filter form elements
const filterForm = document.querySelector("#FilterForm")
const elSearch = document.querySelector("#search")
const elFromInput = document.querySelector("#from")
const elToInput = document.querySelector("#to")
const elManufacturesSelect = document.querySelector(".form-select")
const sortBy = document.querySelector('#sortby')

// edit product modal
const editProductForm = document.querySelector("#edit-form-Product")
const elEditProductTitle = document.querySelector(".edit-product-title")
const elEditProductPrice = document.querySelector(".edit-product-price")
const elEditProductSelect = document.querySelector(".edit-form-select")
const elProductBenefits = document.querySelector(".edit-product-benefits")

const btnCard = document.querySelector("#card")


for (i = 0; i < manufacturers.length; i++) {
  const newOption = document.createElement("option");
  newOption.textContent = manufacturers[i].name;
  elManufacturesSelect.append(newOption);
}
for (i = 0; i < manufacturers.length; i++) {
  const newOption = document.createElement("option");
  newOption.textContent = manufacturers[i].name;
  elSelect.append(newOption);
}
for (i = 0; i < manufacturers.length; i++) {
  const newOption = document.createElement("option");
  newOption.textContent = manufacturers[i].name;
  elEditProductSelect.append(newOption);
}


// render product function
function renderProduct(productArr) {
    list.innerHTML = null
    productArr.forEach((product) => {
        const getDate = (date) => {
            const newDate = new Date(date);
            return `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()}`;
        };

        const newTemp = template.cloneNode(true);
        const {id, title, img, price, model, addedDate, benefits} = product
        newTemp.querySelector(".product-card").setAttribute("data-id", id)
        newTemp.querySelector(".card-img-top").src = img
        newTemp.querySelector(".card-title").textContent = title
        newTemp.querySelector(".product-price").textContent = price
        newTemp.querySelector(".product-price-sale").textContent = (price / 100) * 40
        newTemp.querySelector(".brend").textContent = model
        newTemp.querySelector("#data").textContent = getDate(addedDate)
        newTemp.querySelector(".benafits").textContent = benefits
        elCardsFrgament.append(newTemp)
    })
    list.append(elCardsFrgament)

    if(products.length < 10){
      count.textContent = 'Count 0' + products.length
    } else {
      count.textContent = 'Count ' + products.length
    }
}
renderProduct(products)


// Add new product
function newProduct (e){
    e.preventDefault()
    list.innerHTML = null
    let newProduct = {}
    newProduct.title = newProductTitle.value
    newProduct.img = "https://picsum.photos/300/200?=100"
    newProduct.price = newProductPrice.value
    newProduct.model = elSelect.value
    newProduct.addedDate = new Date("2021-11-12").toISOString()
    newProduct.benefits = newProductBenefits.value
    products.push(newProduct)
    renderProduct(products)
    newProductForm.reset()
}
newProductForm.addEventListener('submit', newProduct)

// Delete and Edit producct
const onCardClick = (event) => {
  if(event.target.matches("#btn-delete")) {
    const currentCard = event.target.closest(".product-card").dataset.id;
    const currentProduct = products.findIndex(
      (product) => product.id === +currentCard
    );
    products.splice(currentProduct, 1);
    renderProduct(products);
  } else if(event.target.matches("#btn-edit")){
    const currentCard = event.target.closest(".product-card").dataset.id;
    const currentProduct = products.find(
      (product) => product.id === +currentCard
    );
    const currentProductIndex = products.findIndex(
      (product) => product.id === +currentCard
    );

    elEditProductTitle.value = currentProduct.title
    elEditProductPrice.value = currentProduct.price
    elEditProductSelect.value = currentProduct.model
    elProductBenefits.value = currentProduct.benefits
    
    const editProduct = (event) => {
      event.preventDefault()

      const editProduct = {
        id: currentProduct.id,
        title: elEditProductTitle.value,
        img: currentProduct.img,
        price: elEditProductPrice.value,
        model: elEditProductSelect.value,
        addedDate: currentProduct.addedDate,
        benefits: elProductBenefits.value,
      };
      products.splice(currentProductIndex, 1, editProduct)
      renderProduct(products)
    }

    editProductForm.addEventListener('submit', editProduct)

  }
}
if (list) list.addEventListener('click', onCardClick)



// FILTER
// Filter products by title
elSearch.addEventListener("input", (e) => {
  const elSearch = new RegExp(e.target.value, "gi");
  const filterProducts = products.filter((product) =>
    product.title.match(elSearch)
  );
  renderProduct(filterProducts);
});

const sortProducts = (e) => {
  e.preventDefault();

  let sortedArray = [];

  if (sortBy.value === "2" ) {
    sortedArray = products.sort((a, b) => a.price - b.price);
    renderProduct(sortedArray);
  } else if (sortBy.value === "3" ) {
    sortedArray = products.sort((a, b) => b.price - a.price);
    renderProduct(sortedArray);
  }
};
filterForm.addEventListener("submit", sortProducts)

// function filterPrice (e){
//   e.preventDefault()
//   if(elToInput.value == 0){
//       // TODO agar elInutTo ni valuesini infinitiyga tenglap qoysa xato bervoti
//       elToInput.value = 10000000
//   }
//   const filteredProducts = products.filter((product) => elToInput.value >= product.price).filter((product) => elFromInput.value <= product.price);
//   renderProduct(filteredProducts)
// }
// filterForm.addEventListener('submit', filterPrice)

// filter products by model
// function FilterModels (e){
//   e.preventDefault()
//   if(elManufacturesSelect.value === "All"){
//     renderProduct(products)
//   }
//   const FilterModels = products.filter((product)=> elManufacturesSelect.value === product.model)
//   renderProduct(FilterModels)
// }
// filterForm.addEventListener('submit', FilterModels)







