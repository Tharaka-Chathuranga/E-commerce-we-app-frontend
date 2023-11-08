function Intro() {
  return (
    <div class="container">
      <main class="card p-3">
        <div class="row">
          <div class="col-lg-9">
            <div class="row">
              <div class="col-xxl-9 col-lg-8">
                <div
                  id="carouselMain"
                  class="carousel-main carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    <article class="carousel-item active">
                      <div class="carousel-caption">
                        <h2 class="mb-3">
                          <span class="fw-normal">Latest trending</span> <br />{" "}
                          <strong>Electronic items</strong>
                        </h2>
                        <a href="#" class="btn btn-warning">
                          {" "}
                          View more{" "}
                        </a>
                      </div>
                      <img
                        style={{ height: "352px" }}
                        src="images/banners/main-tech.png"
                        class="d-block w-100 img-cover"
                        alt="Banner"
                      />
                    </article>
                    <article class="carousel-item">
                      <div class="carousel-caption">
                        <h2 class="mb-3">
                          <span class="fw-normal">Latest delas</span> <br />{" "}
                          <strong>Best Smartphones</strong>
                        </h2>
                        <a href="#" class="btn btn-warning">
                          {" "}
                          View more{" "}
                        </a>
                      </div>
                      <img
                        style={{ height: "352px" }}
                        src="images/banners/main-phone.png"
                        class="d-block w-100 img-cover"
                        alt="Banner"
                      />
                    </article>
                  </div>

                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselMain"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>

                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselMain"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div class="col-xxl-3 col-lg-4 d-none d-lg-block">
                <div class="bg-primary-light p-3 rounded mb-3">
                  <p class="d-flex mb-3 text-base">
                    <img
                      src="images/avatars/avatar.jpg"
                      class="img-avatar me-2"
                      width="44"
                      height="44"
                      alt=""
                    />
                    <span>
                      Hi, user <br /> let's get stated
                    </span>
                  </p>
                  <a href="#" class="btn btn-sm btn-primary w-100">
                    Join now
                  </a>
                </div>

                <div class="bg-warning text-white p-3 rounded mb-2">
                  <br />{" "}
                  <a href="#" class="text-white mt-1 fw-bold d-inline-block">
                    Get now
                  </a>
                </div>
                <div class="bg-info text-white p-3 rounded mb-2">
                  <br />{" "}
                  <a href="#" class="text-white mt-1 fw-bold d-inline-block">
                    Try now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Intro;
