function Deal() {
  return (
    <div class="container">
      <div class="card overflow-hidden">
        <div class="row gx-0">
          <aside
            className="col-lg-3 p-4 bg-cover"
            style={{
              backgroundImage: `url(images/banners/interior.jpg)`,
              backgroundSize: "cover", // You can adjust background properties as needed
              backgroundRepeat: "no-repeat",
            }}
          >
            <header>
              <h3 className="mb-3">
                Home and <br />
                outdoor items
              </h3>
              <a href="#" className="btn btn-light">
                Source now
              </a>
            </header>
          </aside>

          <div class="col-lg-9">
            <ul class="row g-0 bordered-cols m-0">
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    Armchairs{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 25
                  </p>
                </div>
              </li>
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    Office chairs{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 19
                  </p>
                </div>
              </li>
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    Kitchen dishes{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 7
                  </p>
                </div>
              </li>
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    Home Plants{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 10
                  </p>
                </div>
              </li>
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    For Bedroom{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 12
                  </p>
                </div>
              </li>
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    Home Lighting{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 19
                  </p>
                </div>
              </li>
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    Best items{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 19
                  </p>
                </div>
              </li>
              <li class="col-6 col-lg-3 col-md-4">
                <div class="card-product p-3 pe-0">
                  <a href="#" class="title">
                    Category name{" "}
                  </a>
                  <img class="size-72x72 float-end mb-2" src="" />
                  <p class="text-muted small">
                    From <br />
                    USD 19
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Deal;
