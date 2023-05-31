<template>
  <div class="col-12">
    <div class="row">
      <div class="col-4 col-sm-4 col-md-4 col-lg-3 mt-60">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <div class="form-floating">
                <div class="close" v-if="controlsType1">
                  <button
                    class="btn-close"
                    type="button"
                    @click="clear('controlsType1')"
                  ></button>
                </div>
                <select
                  id="controls1"
                  aria-label=".form-select-lg"
                  class="form-select form-select-lg"
                  v-model="controlsType1"
                >
                  <option selected disabled>Контроль</option>
                  <option
                    v-for="option in optionsType"
                    :key="option.id"
                    :value="option.value"
                  >
                    {{ option.value }}
                  </option>
                </select>
                <label for="controls1">Контроль</label>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3 mt-md-148">
              <div class="form-floating">
                <div class="close" v-if="controlsType2">
                  <button
                    class="btn-close"
                    type="button"
                    @click="clear('controlsType2')"
                  ></button>
                </div>
                <select
                  id="controls2"
                  aria-label=".form-select-lg"
                  class="form-select form-select-lg"
                  v-model="controlsType2"
                >
                  <option selected disabled>Контроль</option>
                  <option
                    v-for="option in optionsType"
                    :key="option.id"
                    :value="option.value"
                  >
                    {{ option.value }}
                  </option>
                </select>
                <label for="controls2">Контроль</label>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3 mt-md-148">
              <div class="form-floating">
                <div class="close" v-if="controlsType3">
                  <button
                    class="btn-close"
                    type="button"
                    @click="clear('controlsType3')"
                  ></button>
                </div>
                <select
                  id="controls3"
                  aria-label=".form-select-lg"
                  class="form-select form-select-lg"
                  v-model="controlsType3"
                >
                  <option selected disabled>Контроль</option>
                  <option
                    v-for="option in optionsType"
                    :key="option.id"
                    :value="option.value"
                  >
                    {{ option.value }}
                  </option>
                </select>
                <label for="controls3">Контроль</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 col-sm-8 col-md-8 col-lg-9">
        <div class="row">
          <ul class="nav nav-tabs" id="controlsTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="main-tab"
                data-bs-toggle="tab"
                data-bs-target="#main"
                type="button"
                role="tab"
                aria-controls="main"
                aria-selected="true"
              >
                <span class="nav-link__text">Контрольные соединения №1</span>
                <span class="nav-link__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-sliders2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5ZM12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5ZM1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8Zm9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5Zm1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"
                    />
                  </svg>
                </span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="other1-tab"
                data-bs-toggle="tab"
                data-bs-target="#other1"
                type="button"
                role="tab"
                aria-controls="other1"
                aria-selected="false"
              >
                <span class="nav-link__text">Контрольные соединения №2</span>
                <span class="nav-link__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-plus-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                </span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="other2-tab"
                data-bs-toggle="tab"
                data-bs-target="#other2"
                type="button"
                role="tab"
                aria-controls="other2"
                aria-selected="false"
              >
                <span class="nav-link__text">Контрольные соединения №2</span>
                <span class="nav-link__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-plus-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                    />
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                </span>
              </button>
            </li>
          </ul>
          <div class="tab-content pt-3" id="controlsTabContent">
            <div
              class="tab-pane fade show active"
              id="main"
              role="tabpanel"
              aria-labelledby="main-tab"
            >
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum1"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum1"
                            />
                            <label for="controlsNum1">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade1">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade1')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade1"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade1"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade1">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate1"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate1"
                            />
                            <label for="controlsDate1">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum2"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum2"
                            />
                            <label for="controlsNum2">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade2">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade2')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade2"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade2"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade2">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate2"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate2"
                            />
                            <label for="controlsDate2">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum3"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum3"
                            />
                            <label for="controlsNum3">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade3">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade3')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade3"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade3"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade3">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate3"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate3"
                            />
                            <label for="controlsDate3">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="other1"
              role="tabpanel"
              aria-labelledby="other1-tab"
            >
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum4"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum4"
                            />
                            <label for="controlsNum4">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade4">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade4')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade4"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade4"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade4">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate4"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate4"
                            />
                            <label for="controlsDate4">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum5"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum5"
                            />
                            <label for="controlsNum5">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade5">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade5')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade5"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade5"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade5">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate5"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate5"
                            />
                            <label for="controlsDate5">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum6"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum6"
                            />
                            <label for="controlsNum6">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade6">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade6')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade6"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade6"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade6">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate6"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate6"
                            />
                            <label for="controlsDate6">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="other2"
              role="tabpanel"
              aria-labelledby="other2-tab"
            >
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum7"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum7"
                            />
                            <label for="controlsNum7">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade7">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade7')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade7"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade7"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade7">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate7"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate7"
                            />
                            <label for="controlsDate7">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum8"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum8"
                            />
                            <label for="controlsNum8">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade8">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade8')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade8"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade8"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade8">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate8"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate8"
                            />
                            <label for="controlsDate8">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="cert-control d-flex">
                  <div class="cert-control-item">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="controlsNum9"
                              placeholder="Номер акта №"
                              :class="['form-control']"
                              v-model="controlsNum9"
                            />
                            <label for="controlsNum9">Номер акта №</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <div class="close" v-if="controlsGrade9">
                              <button
                                class="btn-close"
                                type="button"
                                @click="clear('controlsGrade9')"
                              ></button>
                            </div>
                            <select
                              id="controlsGrade9"
                              aria-label=".form-select-lg"
                              class="form-select form-select-lg"
                              v-model="controlsGrade9"
                            >
                              <option selected disabled>Оценка</option>
                              <option
                                v-for="option in optionsGrade"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.value }}
                              </option>
                            </select>
                            <label for="controlsGrade9">Оценка</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="mb-3">
                          <div class="form-floating">
                            <input
                              type="date"
                              id="controlsDate9"
                              placeholder="Дата акта"
                              :class="['form-control']"
                              v-model="controlsDate9"
                            />
                            <label for="controlsDate9">Дата акта</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import AppSelect from "../ui/form/AppSelect.vue";

const props = defineProps<{
  optionsType: [];
  optionsGrade: [];
  defaultOptions?: [];
}>();
const emit = defineEmits<{
  (e: "changeControlsItem"): void;
  (e: "changeType"): void;
}>();

//массив полей
const controls = ref([]);

const controlsType1 = ref<string>("");
const controlsType2 = ref<string>("");
const controlsType3 = ref<string>("");

const controlsNum1 = ref<string>("");
const controlsNum2 = ref<string>("");
const controlsNum3 = ref<string>("");
const controlsNum4 = ref<string>("");
const controlsNum5 = ref<string>("");
const controlsNum6 = ref<string>("");
const controlsNum7 = ref<string>("");
const controlsNum8 = ref<string>("");
const controlsNum9 = ref<string>("");
const controlsGrade1 = ref<string>("");
const controlsGrade2 = ref<string>("");
const controlsGrade3 = ref<string>("");
const controlsGrade4 = ref<string>("");
const controlsGrade5 = ref<string>("");
const controlsGrade6 = ref<string>("");
const controlsGrade7 = ref<string>("");
const controlsGrade8 = ref<string>("");
const controlsGrade9 = ref<string>("");
const controlsDate1 = ref<string>("");
const controlsDate2 = ref<string>("");
const controlsDate3 = ref<string>("");
const controlsDate4 = ref<string>("");
const controlsDate5 = ref<string>("");
const controlsDate6 = ref<string>("");
const controlsDate7 = ref<string>("");
const controlsDate8 = ref<string>("");
const controlsDate9 = ref<string>("");

onMounted(() => {
  console.log(props);

  //когда есть значения по умолчанию
  if (props.defaultOptions) {
    controls.value = props.defaultOptions;

    if (props.defaultOptions.length > 0) {
      controlsType1.value = props.defaultOptions[0].type;

      if (
        props.defaultOptions[0].values.length > 0 &&
        props.defaultOptions[0].values[0]
      ) {
        controlsNum1.value = props.defaultOptions[0].values[0].num;
        controlsGrade1.value = props.defaultOptions[0].values[0].grade;
        controlsDate1.value = props.defaultOptions[0].values[0].date;
      }
      if (
        props.defaultOptions[0].values.length > 1 &&
        props.defaultOptions[0].values[1]
      ) {
        controlsNum4.value = props.defaultOptions[0].values[1].num;
        controlsGrade4.value = props.defaultOptions[0].values[1].grade;
        controlsDate4.value = props.defaultOptions[0].values[1].date;
      }
      if (
        props.defaultOptions[0].values.length > 2 &&
        props.defaultOptions[0].values[2]
      ) {
        controlsNum7.value = props.defaultOptions[0].values[2].num;
        controlsGrade7.value = props.defaultOptions[0].values[2].grade;
        controlsDate7.value = props.defaultOptions[0].values[2].date;
      }
    }

    if (props.defaultOptions.length > 1) {
      controlsType2.value = props.defaultOptions[1].type;

      if (
        props.defaultOptions[1].values.length > 0 &&
        props.defaultOptions[1].values[0]
      ) {
        controlsNum2.value = props.defaultOptions[1].values[0].num;
        controlsGrade2.value = props.defaultOptions[1].values[0].grade;
        controlsDate2.value = props.defaultOptions[1].values[0].date;
      }
      if (
        props.defaultOptions[1].values.length > 1 &&
        props.defaultOptions[1].values[1]
      ) {
        controlsNum5.value = props.defaultOptions[1].values[1].num;
        controlsGrade5.value = props.defaultOptions[1].values[1].grade;
        controlsDate5.value = props.defaultOptions[1].values[1].date;
      }
      if (
        props.defaultOptions[1].values.length > 2 &&
        props.defaultOptions[1].values[2]
      ) {
        controlsNum8.value = props.defaultOptions[1].values[2].num;
        controlsGrade8.value = props.defaultOptions[1].values[2].grade;
        controlsDate8.value = props.defaultOptions[1].values[2].date;
      }
    }

    if (props.defaultOptions.length > 2) {
      controlsType3.value = props.defaultOptions[2].type;

      if (
        props.defaultOptions[2].values.length > 0 &&
        props.defaultOptions[2].values[0]
      ) {
        controlsNum3.value = props.defaultOptions[2].values[0].num;
        controlsGrade3.value = props.defaultOptions[2].values[0].grade;
        controlsDate3.value = props.defaultOptions[2].values[0].date;
      }
      if (
        props.defaultOptions[2].values.length > 1 &&
        props.defaultOptions[2].values[1]
      ) {
        controlsNum6.value = props.defaultOptions[2].values[1].num;
        controlsGrade6.value = props.defaultOptions[2].values[1].grade;
        controlsDate6.value = props.defaultOptions[2].values[1].date;
      }
      if (
        props.defaultOptions[2].values.length > 2 &&
        props.defaultOptions[2].values[2]
      ) {
        controlsNum9.value = props.defaultOptions[2].values[2].num;
        controlsGrade9.value = props.defaultOptions[2].values[2].grade;
        controlsDate9.value = props.defaultOptions[2].values[2].date;
      }
    }
  }
});

//Функция очистки селектов
const clear = (val) => {
  switch (val) {
    case "controlsType1":
      controlsType1.value = "";
      break;
    case "controlsType2":
      controlsType2.value = "";
      break;
    case "controlsType3":
      controlsType3.value = "";
      break;
    case "controlsGrade1":
      controlsGrade1.value = "";
      break;
    case "controlsGrade2":
      controlsGrade2.value = "";
      break;
    case "controlsGrade3":
      controlsGrade3.value = "";
      break;
    case "controlsGrade4":
      controlsGrade4.value = "";
      break;
    case "controlsGrade5":
      controlsGrade5.value = "";
      break;
    case "controlsGrade6":
      controlsGrade6.value = "";
      break;
    case "controlsGrade7":
      controlsGrade7.value = "";
      break;
    case "controlsGrade8":
      controlsGrade8.value = "";
      break;
    case "controlsGrade9":
      controlsGrade9.value = "";
      break;

    default:
      break;
  }
};

function changeControlsFields(val, controlsId) {
  if (!controls.value[controlsId]) {
    controls.value[controlsId] = {};
  }

  if (val[0]) {
    controls.value[controlsId] = {
      controlId: controlsId,
      type: val[0],
    };
  }

  function checkValues(val1, val2, val3, valuesNum) {
    //если все основные значения заполнены:
    if (val[val1] && val[val2] && val[val3]) {
      //добавляем в массив значений
      if (controls.value[controlsId] && controls.value[controlsId].values) {
        controls.value[controlsId].values[valuesNum] = {
          num: val[val1].trim(),
          grade: val[val2],
          date: val[val3],
        };
      } else {
        controls.value[controlsId].values = [];
        controls.value[controlsId].values[valuesNum] = {
          num: val[val1].trim(),
          grade: val[val2],
          date: val[val3],
        };
      }
    } else {
      //если не все значения заполнены очищаем массив значений
      if (controls.value[controlsId] && controls.value[controlsId].values) {
        controls.value[controlsId].values[valuesNum] = null;
      }

      if (controls.value[controlsId] && controls.value[controlsId].values) {
        if (
          controls.value[controlsId].values.length == 3 &&
          !controls.value[controlsId].values[2] &&
          !controls.value[controlsId].values[1]
        ) {
          controls.value[controlsId].values.splice(1, 2);
        } else if (
          controls.value[controlsId].values.length == 3 &&
          !controls.value[controlsId].values[2]
        ) {
          controls.value[controlsId].values.splice(2, 1);
        }
      }
    }
  }

  checkValues(1, 2, 3, 0);
  checkValues(4, 5, 6, 1);
  checkValues(7, 8, 9, 2);

  if (val[0] && val[1] && val[2] && val[3]) {
    //передаем выбранные значения для input
    emit("changeControlsItem", {
      values: controls.value,
    });
  } else {
    //если не все значения заполнены удаляем(очищаем) элемент из массива
    if (controlsId === 0 || !controls.value[controlsId].values) {
      controls.value[controlsId] = null;
    }

    //передаем выбранные значения для input
    emit("changeControlsItem", {
      values: controls.value,
    });
  }
}

watch(
  [
    controlsType1,
    controlsNum1,
    controlsGrade1,
    controlsDate1,
    controlsNum4,
    controlsGrade4,
    controlsDate4,
    controlsNum7,
    controlsGrade7,
    controlsDate7,
  ],
  (val) => {
    changeControlsFields(val, 0);
  }
);
watch(
  [
    controlsType2,
    controlsNum2,
    controlsGrade2,
    controlsDate2,
    controlsNum5,
    controlsGrade5,
    controlsDate5,
    controlsNum8,
    controlsGrade8,
    controlsDate8,
  ],
  (val) => {
    changeControlsFields(val, 1);
  }
);
watch(
  [
    controlsType3,
    controlsNum3,
    controlsGrade3,
    controlsDate3,
    controlsNum6,
    controlsGrade6,
    controlsDate6,
    controlsNum9,
    controlsGrade9,
    controlsDate9,
  ],
  (val) => {
    changeControlsFields(val, 2);
  }
);
</script>

<style></style>
