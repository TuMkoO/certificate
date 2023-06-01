<template>
  <div>
    <app-loader v-if="loading"></app-loader>
    <form v-else class="certificate-form row">
      <div class="certificate-form-field-title mt-0">
        <span>Тип протокола:</span>
      </div>

      <div class="col-lg-12">
        <div
          class="btn-group mb-3"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            value="sheetPipe"
            autocomplete="off"
            v-model="certType"
            @change="changeCertType"
          />
          <label class="btn btn-outline-primary" for="btnradio1"
            >Лист/труба</label
          >
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio2"
            value="fittings"
            autocomplete="off"
            v-model="certType"
            @change="changeCertType"
          />
          <label class="btn btn-outline-primary" for="btnradio2"
            >Арматура</label
          >
        </div>
      </div>

      <div class="certificate-form-field-title mt-0">
        <span>Текст в шапке:</span>
      </div>

      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="date"
              id="protocolDate"
              placeholder="Дата протокола"
              :class="['form-control', { 'is-invalid': dError }]"
              v-model="date"
              @change="dateChange"
            />
            <label for="protocolDate">Дата протокола</label>
          </div>
          <div class="form-text text-danger" v-if="dError">
            {{ dError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="protocolNum"
              placeholder="Номер протокола"
              :class="['form-control', { 'is-invalid': numProtError }]"
              v-model="numProtocol"
            />
            <label for="protocolNum">Номер протокола</label>
          </div>
          <div class="form-text text-danger" v-if="numProtError">
            {{ numProtError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="certNum"
              placeholder="Номер удостоверения"
              :class="['form-control', { 'is-invalid': numCertError }]"
              v-model="numCertificate"
            />
            <label for="certNum">Номер удостоверения</label>
          </div>
          <div class="form-text text-danger" v-if="numCertError">
            {{ numCertError }}
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="mb-3">
          <div class="form-floating">
            <textarea
              placeholder="Текст шапки"
              id="textHead"
              :class="[
                'form-control',
                'certificate-text-head',
                { 'is-invalid': tHeadError },
              ]"
              v-model="textHead"
            ></textarea>
            <label for="textHead">Текст шапки</label>
          </div>
          <div class="form-text text-danger" v-if="tHeadError">
            {{ tHeadError }}
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span>Личные данные:</span>
      </div>

      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="firstName"
              placeholder="Фамилия"
              :class="['form-control', { 'is-invalid': fNameError }]"
              v-model="firstname"
            />
            <label for="firstName">Фамилия</label>
          </div>
          <div class="form-text text-danger" v-if="fNameError">
            {{ fNameError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="secondName"
              placeholder="Имя"
              :class="['form-control', { 'is-invalid': sNameError }]"
              v-model="secondname"
            />
            <label for="secondName">Имя</label>
          </div>
          <div class="form-text text-danger" v-if="sNameError">
            {{ sNameError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="lastName"
              placeholder="Отчество"
              :class="['form-control', { 'is-invalid': lNameError }]"
              v-model="lastname"
            />
            <label for="lastName">Отчество</label>
          </div>
          <div class="form-text text-danger" v-if="lNameError">
            {{ lNameError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="date"
              id="birthday"
              placeholder="Дата рождения"
              :class="['form-control', { 'is-invalid': bDayError }]"
              v-model="birthday"
            />
            <label for="birthday">Дата рождения</label>
          </div>
          <div class="form-text text-danger" v-if="bDayError">
            {{ bDayError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="passport"
              placeholder="Паспорт"
              :class="['form-control', { 'is-invalid': passportError }]"
              v-model="passport"
            />
            <label for="passport">Паспорт</label>
          </div>
          <div class="form-text text-danger" v-if="passportError">
            {{ passportError }}
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="numOldCert"
              placeholder="Номер аттестационного удостоверения сварщика (при наличии)"
              :class="['form-control', { 'is-invalid': numOldCertError }]"
              v-model="numOldCert"
            />
            <label for="numOldCert"
              >Номер аттестационного удостоверения сварщика (при наличии)
            </label>
          </div>
          <div class="form-text text-danger" v-if="numOldCertError">
            {{ numOldCertError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="date"
              id="dateOldCert"
              placeholder="Дата выдачи (при наличии)"
              :class="['form-control', { 'is-invalid': dateOldCertError }]"
              v-model="dateOldCert"
            />
            <label for="dateOldCert">Дата выдачи (при наличии)</label>
          </div>
          <div class="form-text text-danger" v-if="dateOldCertError">
            {{ dateOldCertError }}
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span>Сведения о работе:</span>
      </div>

      <div class="col-12">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="work"
              placeholder="Место работы"
              :class="['form-control', { 'is-invalid': wError }]"
              v-model="work"
            />
            <label for="work">Место работы</label>
          </div>
          <div class="form-text text-danger" v-if="wError">
            {{ wError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="number"
              min="0"
              id="workYears"
              placeholder="Стаж работы по сварке (полных лет)"
              :class="['form-control', { 'is-invalid': wYearsError }]"
              v-model="workYears"
            />
            <label for="workYears">Стаж работы по сварке (полных лет)</label>
          </div>
          <div class="form-text text-danger" v-if="wYearsError">
            {{ wYearsError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <AppSelect
            name="qualifyingRank"
            label="Квалификационный разряд"
            :options="optionsQualifyingRank"
            :invalid="!!qRankError"
            :selectedDefault="certValues?.qualifyingRank"
            @select="selectQualifyingRank"
          />

          <div class="form-text text-danger" v-if="qRankError">
            {{ qRankError }}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-3">
          <AppSelect
            name="attestationType"
            label="Вид аттестации"
            :options="optionsAttestationType"
            :invalid="!!aTypeError"
            :selectedDefault="certValues?.attestationType"
            @select="selectAttestationType"
          />

          <div class="form-text text-danger" v-if="aTypeError">
            {{ aTypeError }}
          </div>
        </div>
      </div>

      <div class="py-5">
        <ul class="nav nav-tabs" id="tabVariable" role="tablist">
          <li
            class="nav-item"
            :class="{
              'nav-item-danger':
                sError ||
                wMethodError ||
                wTypeError ||
                wSeamError ||
                wConnectionError ||
                wpError ||
                wjError ||
                apError ||
                pError ||
                hTreatmentError ||
                bError ||
                tError ||
                diameterError ||
                eError ||
                fError,
            }"
            role="presentation"
          >
            <button
              class="nav-link active"
              id="varMain-tab"
              data-bs-toggle="tab"
              data-bs-target="#varMain"
              type="button"
              role="tab"
              aria-controls="varMain"
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
              id="varSecondary-tab"
              data-bs-toggle="tab"
              data-bs-target="#varSecondary"
              type="button"
              role="tab"
              aria-controls="varSecondary"
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
              id="varThird-tab"
              data-bs-toggle="tab"
              data-bs-target="#varThird"
              type="button"
              role="tab"
              aria-controls="varThird"
              aria-selected="false"
            >
              <span class="nav-link__text">Контрольные соединения №3</span>
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
        <div class="tab-content" id="tabVariableContent">
          <div
            class="tab-pane px-3 fade show active"
            id="varMain"
            role="tabpanel"
            aria-labelledby="varMain-tab"
          >
            <div class="row">
              <div class="certificate-form-field-title">
                <span>Характеристика контрольного сварного соединения:</span>
              </div>

              <div class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="stigma1"
                      placeholder="Маркировка образца (клеймо)"
                      :class="['form-control', { 'is-invalid': sError }]"
                      v-model="stigma"
                      @change="onChangeItem(stigmaVal, 0, stigma)"
                    />

                    <label for="stigma1">Маркировка образца (клеймо)</label>
                  </div>
                  <div class="form-text text-danger" v-if="sError">
                    {{ sError }}
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="mb-3">
                  <AppSelect
                    name="weldingMethod1"
                    label="Способ сварки"
                    :options="optionsWeldingMethod"
                    :invalid="!!wMethodError"
                    :selectedDefault="weldingMethod"
                    @select="selectWeldingMethod1"
                  />
                  <div class="form-text text-danger" v-if="wMethodError">
                    {{ wMethodError }}
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="stigmaGeneral"
                      placeholder="Маркировка образца (клеймо)(общее значение)"
                      :class="['form-control', { 'is-invalid': sGError }]"
                      v-model="stigmaGeneral"
                    />
                    <label for="stigma1"
                      >Маркировка образца (клеймо)(общее значение)</label
                    >
                  </div>
                  <div class="form-text text-danger" v-if="sGError">
                    {{ sGError }}
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Вид свариваемых деталей:"
                    :options="optionsWeldedType"
                    :defaultOptions="weldedTypeDefault"
                    @checked="onCheckedWeldedType"
                  >
                  </app-checkbox-group>

                  <div class="form-text text-danger" v-if="wTypeError">
                    {{ wTypeError }}
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип сварного шва:"
                    :options="optionsWeldedSeam"
                    :defaultOptions="weldedSeamDefault"
                    @checked="onCheckedWeldedSeam"
                  >
                  </app-checkbox-group>
                  <div class="form-text text-danger" v-if="wSeamError">
                    {{ wSeamError }}
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип и вид соединения:"
                    :options="optionsWeldedConnection"
                    :defaultOptions="weldedConnectionDefault"
                    @checked="onCheckedWeldedConnection"
                  >
                  </app-checkbox-group>
                  <div class="form-text text-danger" v-if="wConnectionError">
                    {{ wConnectionError }}
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Положение при сварке:"
                    :options="optionsWeldedPosition"
                    :defaultOptions="weldedPositionDefault"
                    @checked="onCheckedWeldedPosition"
                  >
                  </app-checkbox-group>
                  <div class="form-text text-danger" v-if="wpError">
                    {{ wpError }}
                  </div>
                </div>
              </div>
              <div v-if="certType == 'sheetPipe'" class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="preheating1"
                      placeholder="Предварительный и сопутствующий подогрев"
                      :class="['form-control', { 'is-invalid': pError }]"
                      v-model="preheating"
                      @change="onChangeItem(preheatingVal, 0, preheating)"
                    />
                    <label for="preheating1"
                      >Предварительный и сопутствующий подогрев</label
                    >
                  </div>
                  <div class="form-text text-danger" v-if="pError">
                    {{ pError }}
                  </div>
                </div>
              </div>
              <div v-if="certType == 'sheetPipe'" class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="heatTreatment1"
                      placeholder="Термическая обработка"
                      :class="[
                        'form-control',
                        { 'is-invalid': hTreatmentError },
                      ]"
                      v-model="heatTreatment"
                      @change="onChangeItem(heatTreatmentVal, 0, heatTreatment)"
                    />
                    <label for="heatTreatment1">Термическая обработка</label>
                  </div>
                  <div class="form-text text-danger" v-if="hTreatmentError">
                    {{ hTreatmentError }}
                  </div>
                </div>
              </div>

              <div v-if="certType == 'fittings'" class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Положение осей стержней:"
                    :options="optionsAxesPosition"
                    :defaultOptions="axesPositionDefault"
                    @checked="onCheckedAxesPosition"
                  >
                  </app-checkbox-group>
                  <div class="form-text text-danger" v-if="apError">
                    {{ apError }}
                  </div>
                </div>
              </div>
              <div v-if="certType == 'fittings'" class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип сварного соединения:"
                    :options="optionsWeldedJoint"
                    :defaultOptions="weldedJointDefault"
                    @checked="onCheckedWeldedJoint"
                  >
                  </app-checkbox-group>
                  <div class="form-text text-danger" v-if="wjError">
                    {{ wjError }}
                  </div>
                </div>
              </div>

              <div class="certificate-form-field-title">
                <span>Материал образца:</span>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Марка и группа:"
                    :options="optionsBrand"
                    :defaultOptions="brandDefault"
                    @checked="onCheckedBrand"
                  >
                  </app-checkbox-group>

                  <div class="form-text text-danger" v-if="bError">
                    {{ bError }}
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="thickness1"
                      placeholder="Толщина образца (мм)"
                      :class="['form-control', { 'is-invalid': tError }]"
                      v-model="thickness"
                      @change="onChangeItem(thicknessVal, 0, thickness)"
                    />
                    <label for="thickness1">Толщина образца (мм)</label>
                  </div>
                  <div class="form-text text-danger" v-if="tError">
                    {{ tError }}
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="diameter1"
                      placeholder="Наружный диаметр трубы (мм)"
                      :class="['form-control', { 'is-invalid': diameterError }]"
                      v-model="diameter"
                      @change="onChangeItem(diameterVal, 0, diameter)"
                    />
                    <label v-if="certType == 'sheetPipe'" for="diameter1"
                      >Наружный диаметр трубы (мм)</label
                    >
                    <label v-if="certType == 'fittings'" for="diameter1"
                      >Диаметр стержня (мм)</label
                    >
                  </div>
                  <div class="form-text text-danger" v-if="diameterError">
                    {{ diameterError }}
                  </div>
                </div>
              </div>

              <div class="certificate-form-field-title">
                <span>Сварочные материалы:</span>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Электрод или присадочная проволока:"
                    :options="optionsElectrode"
                    :defaultOptions="electrodeDefault"
                    @checked="onCheckedElectrode"
                  >
                  </app-checkbox-group>

                  <div class="form-text text-danger" v-if="eError">
                    {{ eError }}
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="flux1"
                      placeholder="Защитный газ и флюс"
                      :class="['form-control', { 'is-invalid': fError }]"
                      v-model="flux"
                      @change="onChangeItem(fluxVal, 0, flux)"
                    />
                    <label for="flux1">Защитный газ и флюс</label>
                  </div>
                  <div class="form-text text-danger" v-if="fError">
                    {{ fError }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane px-3 fade"
            id="varSecondary"
            role="tabpanel"
            aria-labelledby="varSecondary-tab"
          >
            <div class="row">
              <div class="certificate-form-field-title">
                <span>Характеристика контрольного сварного соединения:</span>
              </div>

              <div class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="stigma2"
                      placeholder="Маркировка образца (клеймо)"
                      class="form-control"
                      v-model="stigma2"
                      @change="onChangeItem(stigmaVal, 1, stigma2)"
                    />
                    <label for="stigma2">Маркировка образца (клеймо)</label>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <AppSelect
                    name="weldingMethod2"
                    label="Способ сварки"
                    :options="optionsWeldingMethod"
                    :selectedDefault="weldingMethod2"
                    @select="selectWeldingMethod2"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Вид свариваемых деталей:"
                    :options="optionsWeldedType"
                    :defaultOptions="weldedTypeDefault2"
                    @checked="onCheckedWeldedType2"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип сварного шва:"
                    :options="optionsWeldedSeam"
                    :defaultOptions="weldedSeamDefault2"
                    @checked="onCheckedWeldedSeam2"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип и вид соединения:"
                    :options="optionsWeldedConnection"
                    :defaultOptions="weldedConnectionDefault2"
                    @checked="onCheckedWeldedConnection2"
                  >
                  </app-checkbox-group>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Положение при сварке:"
                    :options="optionsWeldedPosition"
                    :defaultOptions="weldedPositionDefault2"
                    @checked="onCheckedWeldedPosition2"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div v-if="certType == 'sheetPipe'" class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="preheating2"
                      placeholder="Предварительный и сопутствующий подогрев"
                      class="form-control"
                      v-model="preheating2"
                      @change="onChangeItem(preheatingVal, 1, preheating2)"
                    />
                    <label for="preheating2"
                      >Предварительный и сопутствующий подогрев</label
                    >
                  </div>
                </div>
              </div>
              <div v-if="certType == 'sheetPipe'" class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="heatTreatment2"
                      placeholder="Термическая обработка"
                      class="form-control"
                      v-model="heatTreatment2"
                      @change="
                        onChangeItem(heatTreatmentVal, 1, heatTreatment2)
                      "
                    />
                    <label for="heatTreatment2">Термическая обработка</label>
                  </div>
                </div>
              </div>

              <div v-if="certType == 'fittings'" class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Положение осей стержней:"
                    :options="optionsAxesPosition"
                    :defaultOptions="axesPositionDefault2"
                    @checked="onCheckedAxesPosition2"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div v-if="certType == 'fittings'" class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип сварного соединения:"
                    :options="optionsWeldedJoint"
                    :defaultOptions="weldedJointDefault2"
                    @checked="onCheckedWeldedJoint2"
                  >
                  </app-checkbox-group>
                </div>
              </div>

              <div class="certificate-form-field-title">
                <span>Материал образца:</span>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Марка и группа:"
                    :options="optionsBrand"
                    :defaultOptions="brandDefault2"
                    @checked="onCheckedBrand2"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="thickness2"
                      placeholder="Толщина образца (мм)"
                      class="form-control"
                      v-model="thickness2"
                      @change="onChangeItem(thicknessVal, 1, thickness2)"
                    />
                    <label for="thickness2">Толщина образца (мм)</label>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="diameter2"
                      placeholder="Наружный диаметр трубы (мм)"
                      class="form-control"
                      v-model="diameter2"
                      @change="onChangeItem(diameterVal, 1, diameter2)"
                    />

                    <label v-if="certType == 'sheetPipe'" for="diameter2"
                      >Наружный диаметр трубы (мм)</label
                    >
                    <label v-if="certType == 'fittings'" for="diameter2"
                      >Диаметр стержня (мм)</label
                    >
                  </div>
                </div>
              </div>

              <div class="certificate-form-field-title">
                <span>Сварочные материалы:</span>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Электрод или присадочная проволока:"
                    :options="optionsElectrode"
                    :defaultOptions="electrodeDefault2"
                    @checked="onCheckedElectrode2"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="flux2"
                      placeholder="Защитный газ и флюс"
                      class="form-control"
                      v-model="flux2"
                      @change="onChangeItem(fluxVal, 1, flux2)"
                    />
                    <label for="flux2">Защитный газ и флюс</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane px-3 fade"
            id="varThird"
            role="tabpanel"
            aria-labelledby="varThird-tab"
          >
            <div class="row">
              <div class="certificate-form-field-title">
                <span>Характеристика контрольного сварного соединения:</span>
              </div>

              <div class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="stigma3"
                      placeholder="Маркировка образца (клеймо)"
                      class="form-control"
                      v-model="stigma3"
                      @change="onChangeItem(stigmaVal, 2, stigma3)"
                    />
                    <label for="stigma3">Маркировка образца (клеймо)</label>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <AppSelect
                    name="weldingMethod3"
                    label="Способ сварки"
                    :options="optionsWeldingMethod"
                    :selectedDefault="weldingMethod3"
                    @select="selectWeldingMethod3"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Вид свариваемых деталей:"
                    :options="optionsWeldedType"
                    :defaultOptions="weldedTypeDefault3"
                    @checked="onCheckedWeldedType3"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип сварного шва:"
                    :options="optionsWeldedSeam"
                    :defaultOptions="weldedSeamDefault3"
                    @checked="onCheckedWeldedSeam3"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип и вид соединения:"
                    :options="optionsWeldedConnection"
                    :defaultOptions="weldedConnectionDefault3"
                    @checked="onCheckedWeldedConnection3"
                  >
                  </app-checkbox-group>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Положение при сварке:"
                    :options="optionsWeldedPosition"
                    :defaultOptions="weldedPositionDefault3"
                    @checked="onCheckedWeldedPosition3"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div v-if="certType == 'sheetPipe'" class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="preheating3"
                      placeholder="Предварительный и сопутствующий подогрев"
                      class="form-control"
                      v-model="preheating3"
                      @change="onChangeItem(preheatingVal, 2, preheating3)"
                    />
                    <label for="preheating3"
                      >Предварительный и сопутствующий подогрев</label
                    >
                  </div>
                </div>
              </div>
              <div v-if="certType == 'sheetPipe'" class="col-lg-6">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="heatTreatment3"
                      placeholder="Термическая обработка"
                      class="form-control"
                      v-model="heatTreatment3"
                      @change="
                        onChangeItem(heatTreatmentVal, 2, heatTreatment3)
                      "
                    />
                    <label for="heatTreatment3">Термическая обработка</label>
                  </div>
                </div>
              </div>

              <div v-if="certType == 'fittings'" class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Положение осей стержней:"
                    :options="optionsAxesPosition"
                    :defaultOptions="axesPositionDefault3"
                    @checked="onCheckedAxesPosition3"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div v-if="certType == 'fittings'" class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Тип сварного соединения:"
                    :options="optionsWeldedJoint"
                    :defaultOptions="weldedJointDefault3"
                    @checked="onCheckedWeldedJoint3"
                  >
                  </app-checkbox-group>
                </div>
              </div>

              <div class="certificate-form-field-title">
                <span>Материал образца:</span>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Марка и группа:"
                    :options="optionsBrand"
                    :defaultOptions="brandDefault3"
                    @checked="onCheckedBrand3"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="thickness3"
                      placeholder="Толщина образца (мм)"
                      class="form-control"
                      v-model="thickness3"
                      @change="onChangeItem(thicknessVal, 2, thickness3)"
                    />
                    <label for="thickness3">Толщина образца (мм)</label>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="diameter3"
                      placeholder="Наружный диаметр трубы (мм)"
                      class="form-control"
                      v-model="diameter3"
                      @change="onChangeItem(diameterVal, 2, diameter3)"
                    />

                    <label v-if="certType == 'sheetPipe'" for="diameter3"
                      >Наружный диаметр трубы (мм)</label
                    >
                    <label v-if="certType == 'fittings'" for="diameter3"
                      >Диаметр стержня (мм)</label
                    >
                  </div>
                </div>
              </div>

              <div class="certificate-form-field-title">
                <span>Сварочные материалы:</span>
              </div>

              <div class="col-lg-12">
                <div class="mb-3">
                  <app-checkbox-group
                    title="Электрод или присадочная проволока:"
                    :options="optionsElectrode"
                    :defaultOptions="electrodeDefault3"
                    @checked="onCheckedElectrode3"
                  >
                  </app-checkbox-group>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="flux3"
                      placeholder="Защитный газ и флюс"
                      class="form-control"
                      v-model="flux3"
                      @change="onChangeItem(fluxVal, 2, flux3)"
                    />
                    <label for="flux3">Защитный газ и флюс</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span>Результаты контроля качества образца:</span>
      </div>

      <certificate-form-quality-control
        :optionsGrade="optionsGrade"
        :optionsType="optionsControl"
        :defaultOptions="certValues?.controls"
        @changeControlsItem="onCheckedQualityControls"
      ></certificate-form-quality-control>

      <div class="form-text text-danger mb-2" v-if="controlsError">
        {{ controlsError }}
      </div>

      <div class="certificate-form-field-title">
        <span>Наименование НПА по нормам оценки качества:</span>
      </div>

      <div class="col-lg-12">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="npa"
              placeholder="Наименование НПА"
              :class="['form-control', { 'is-invalid': npaError }]"
              v-model="npa"
            />
            <label for="npa">Наименование НПА</label>
          </div>
          <div class="form-text text-danger" v-if="npaError">
            {{ npaError }}
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span>Оценка теоретических знаний:</span>
      </div>

      <div class="col-lg-4">
        <div class="mb-3">
          <AppSelect
            name="grade"
            label="Оценка теоретических знаний"
            :options="optionsGrade"
            :invalid="!!gError"
            :selectedDefault="grade"
            @select="selectGrade"
          />
          <div class="form-text text-danger" v-if="gError">
            {{ gError }}
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span>Решение аттестационной комиссии:</span>
      </div>
      <div class="col-lg-12">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="decision"
              placeholder="Решение аттестационной комиссии"
              :class="['form-control', { 'is-invalid': decisionError }]"
              v-model="decision"
            />
            <label for="decision">Решение аттестационной комиссии</label>
          </div>
          <div class="form-text text-danger" v-if="decisionError">
            {{ decisionError }}
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span
          >Допущен к ручной дуговой сварке по следующим группам технических
          устройств опасных производственных объектов:</span
        >
      </div>

      <div class="col-12">
        <div class="mb-3 mb-lg-0">
          <app-checkbox-dropdown
            v-for="(item, idx) in checkboxDropdownAccess"
            :key="item._id"
            :mainItem="{ value: item.value, id: item._id }"
            :items="
              checkboxDropdownAccessItems.filter(
                (aItem) => aItem.owner == item._id
              )
            "
            :defaultItems="certValues?.accesses"
            :collapseId="'collapseCheckbox' + idx"
            @checked="onCheckedAccessSubItems"
          ></app-checkbox-dropdown>

          <div class="form-text text-danger" v-if="accessesError">
            {{ accessesError }}
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span>Срок, аттестационная комиссия:</span>
      </div>

      <div class="col-lg-4">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="date"
              class="form-control"
              id="expiration"
              placeholder="Срок периодической аттестации"
              :class="['form-select', { 'is-invalid': expError }]"
              v-model="expiration"
            />
            <label for="expiration">Срок периодической аттестации</label>
          </div>
          <div class="form-text text-danger" v-if="expError">
            {{ expError }}
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Аттестационная комиссия:"
            :options="optionsComission"
            :defaultOptions="certValues?.comission"
            @checked="onCheckedComission"
          >
          </app-checkbox-group>

          <div class="form-text text-danger" v-if="сError">
            {{ сError }}
          </div>
        </div>
      </div>

      <div class="certificate-form-field-title">
        <span
          >Сведения о сварке контрольных образцов и область распространения
          аттестации:</span
        >
      </div>

      <div class="col-lg-4">
        <div class="mb-3">
          <AppSelect
            name="weldingMethodScope"
            label="Способ сварки"
            :options="optionsWeldingMethod"
            :invalid="!!wMethodSError"
            :selectedDefault="weldingMethodScope"
            @select="selectWeldingMethodScope"
          />
          <div class="form-text text-danger" v-if="wMethodSError">
            {{ wMethodSError }}
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Вид свариваемых деталей:"
            :options="optionsWeldedType"
            :defaultOptions="certValues?.weldedTypeScope"
            @checked="onCheckedWeldedTypeScope"
          >
          </app-checkbox-group>

          <div class="form-text text-danger" v-if="wTypeSError">
            {{ wTypeSError }}
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Вид шва:"
            :options="optionsWeldedSeam"
            :defaultOptions="certValues?.weldedSeamScope"
            @checked="onCheckedWeldedSeamScope"
          >
          </app-checkbox-group>
          <div class="form-text text-danger" v-if="wSeamSError">
            {{ wSeamSError }}
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Марка и группа:"
            :options="optionsBrand"
            :defaultOptions="certValues?.brandScope"
            @checked="onCheckedBrandScope"
          >
          </app-checkbox-group>

          <div class="form-text text-danger" v-if="bSError">
            {{ bSError }}
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Тип присадочного металла:"
            :options="optionsElectrode"
            :defaultOptions="certValues?.electrodeScope"
            @checked="onCheckedElectrodeScope"
          >
          </app-checkbox-group>
          <div class="form-text text-danger" v-if="eSError">
            {{ eSError }}
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="fluxScope"
              placeholder="Защитный газ (флюс)"
              :class="['form-control', { 'is-invalid': fSError }]"
              v-model="fluxScope"
            />
            <label for="fluxScope">Защитный газ (флюс)</label>
          </div>
          <div class="form-text text-danger" v-if="fSError">
            {{ fSError }}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="auxiliaryScope"
              placeholder="Вспомогательные материалы"
              :class="['form-control', { 'is-invalid': auxiliarySError }]"
              v-model="auxiliaryScope"
            />
            <label for="auxiliaryScope">Вспомогательные материалы</label>
          </div>
          <div class="form-text text-danger" v-if="auxiliarySError">
            {{ auxiliarySError }}
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="thicknessScope"
              placeholder="Толщина образца (мм)"
              :class="['form-control', { 'is-invalid': tSError }]"
              v-model="thicknessScope"
            />
            <label for="thickness1">Толщина образца (мм)</label>
          </div>
          <div class="form-text text-danger" v-if="tSError">
            {{ tSError }}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="mb-3">
          <div class="form-floating">
            <input
              type="text"
              id="diameterScope"
              placeholder="Наружный диаметр трубы (мм)"
              :class="['form-control', { 'is-invalid': diameterSError }]"
              v-model="diameterScope"
            />
            <label v-if="certType == 'sheetPipe'" for="diameterScope"
              >Наружный диаметр трубы (мм)</label
            >
            <label v-if="certType == 'fittings'" for="diameterScope"
              >Диаметр стержня (мм)</label
            >
          </div>
          <div class="form-text text-danger" v-if="diameterSError">
            {{ diameterSError }}
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Положение при сварке:"
            :options="optionsWeldedPosition"
            :defaultOptions="certValues?.weldedPositionScope"
            @checked="onCheckedWeldedPositionScope"
          >
          </app-checkbox-group>
          <div class="form-text text-danger" v-if="wpSError">
            {{ wpSError }}
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Исполнение сварного шва:"
            :options="optionsWeldedConnection"
            :defaultOptions="certValues?.weldedConnectionScope"
            @checked="onCheckedWeldedConnectionScope"
          >
          </app-checkbox-group>
          <div class="form-text text-danger" v-if="wConnectionSError">
            {{ wConnectionSError }}
          </div>
        </div>
      </div>

      <div v-if="certType == 'fittings'" class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Положение осей стержней:"
            :options="optionsAxesPosition"
            :defaultOptions="axesPositionScopeDefault"
            @checked="onCheckedAxesPositionScope"
          >
          </app-checkbox-group>
          <div class="form-text text-danger" v-if="apSError">
            {{ apSError }}
          </div>
        </div>
      </div>
      <div v-if="certType == 'fittings'" class="col-lg-12">
        <div class="mb-3">
          <app-checkbox-group
            title="Тип сварного соединения:"
            :options="optionsWeldedJoint"
            :defaultOptions="weldedJointScopeDefault"
            @checked="onCheckedWeldedJointScope"
          >
          </app-checkbox-group>
          <div class="form-text text-danger" v-if="wjSError">
            {{ wjSError }}
          </div>
        </div>
      </div>
    </form>

    <div
      v-if="certSubmit == 'create'"
      class="certificate-nav text-center font-family-default d-flex justify-content-center"
    >
      <button
        class="btn btn-cert-control btn-cert-control-success rounded-circle mx-3"
        type="button"
        title="Добавить"
        @click="onSubmit"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
            />
          </svg>
        </span>
      </button>

      <router-link v-slot="{ navigate }" to="/">
        <button
          class="btn btn-cert-control btn-cert-control-danger rounded-circle mx-3"
          type="button"
          title="Отмена"
          @click="navigate"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-reply"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"
              />
            </svg>
          </span>
        </button>
      </router-link>
    </div>

    <div
      v-if="certSubmit == 'edit'"
      class="certificate-nav text-center font-family-default d-flex justify-content-center"
    >
      <button
        class="btn btn-cert-control btn-cert-control-success rounded-circle mx-3"
        type="button"
        title="Сохранить"
        @click="showModal"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
            />
          </svg>
        </span>
      </button>

      <button
        class="btn btn-cert-control btn-cert-control-danger rounded-circle mx-3"
        type="button"
        title="Отмена"
        @click="$emit('hide')"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-reply"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"
            />
          </svg>
        </span>
      </button>
    </div>
    <teleport to="body">
      <app-modal
        v-if="modal"
        title="Изменить запись в реестре?"
        @close="closeModal"
      >
        <div class="modal-body">
          Запись удостоверения №{{ certValues?.numCertificate }} будет изменена
          в реестре. Вы подтверждаете внесение изменений?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="onSubmit">
            Да
          </button>
          <button type="button" class="btn btn-danger" @click="closeModal">
            Нет
          </button>
        </div>
      </app-modal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { dateFormatForInput } from "../../utils/dateFormatForInput";
import * as yup from "yup";
import AppCheckboxGroup from "../AppCheckboxGroup.vue";
import AppCheckboxDropdown from "../AppCheckboxDropdown.vue";
import AppLoader from "../ui/AppLoader.vue";
import AppSelect from "../ui/form/AppSelect.vue";
import AppModal from "../AppModal.vue";
import CertificateFormQualityControl from "./CertificateFormQualityControl.vue";
import type { ICheckboxGroupOption } from "@/types/ICheckboxGroupOption";
import type { ICheckboxGroupValues } from "@/types/ICheckboxGroupValues";
import type { ICertificate } from "@/types/ICertificate";
import type { ISelectValue } from "@/types/ISelectValue";
import type { ICheckboxDropdownCheckedValues } from "@/types/ICheckboxDropdownCheckedValues";
import type { ICheckboxDropdownDefaultItem } from "@/types/ICheckboxDropdownDefaultItem";
import type { ICheckboxDropdownItem } from "@/types/ICheckboxDropdownItem";
import type { IQualityControlEmitChangeControlsItem } from "@/types/IQualityControlEmitChangeControlsItem";

type ItemsVal = string | undefined;

interface IOptionsItem {
  id: string;
  _id: string;
  value: string;
}
interface ISubCertificateProps {
  birthday: Date;
  date: Date;
  firstname: string;
  id: string;
  lastname: string;
  numCertificate: string;
  passport: string;
  qualifyingRank: string;
  secondname: string;
  work: string;
  workYears: number;
}

const props = defineProps<{
  certValues?: ICertificate & ISubCertificateProps;
  certSubmit: string;
}>();

const emit = defineEmits<{
  (e: "hide"): void;
  (e: "update"): void;
}>();

//подключаем store
const store = useStore();
//
const router = useRouter();
//loader
const loading = ref<boolean>(true);
//Показ модального окна
const modal = ref<boolean>(false);

//Тип протокола
const certType = ref<string>("sheetPipe");

//значение input
const stigma2 = ref<string>("");
const stigma3 = ref<string>("");
const weldingMethod2 = ref<string>("");
const weldingMethod3 = ref<string>("");
const preheating2 = ref<string>("");
const preheating3 = ref<string>("");
const heatTreatment2 = ref<string>("");
const heatTreatment3 = ref<string>("");
const thickness2 = ref<string>("");
const thickness3 = ref<string>("");
const diameter2 = ref<string>("");
const diameter3 = ref<string>("");
const flux2 = ref<string>("");
const flux3 = ref<string>("");

//переменные для значений по умолчанию для полей, зависимых от типа протокола
const axesPositionDefault = ref<string[]>([]);
const axesPositionDefault2 = ref<string[]>([]);
const axesPositionDefault3 = ref<string[]>([]);
const axesPositionScopeDefault = ref<string[]>([]);
const weldedJointDefault = ref<string[]>([]);
const weldedJointDefault2 = ref<string[]>([]);
const weldedJointDefault3 = ref<string[]>([]);
const weldedJointScopeDefault = ref<string[]>([]);

const weldedTypeDefault = ref<string[]>([]);
const weldedTypeDefault2 = ref<string[]>([]);
const weldedTypeDefault3 = ref<string[]>([]);
const weldedSeamDefault = ref<string[]>([]);
const weldedSeamDefault2 = ref<string[]>([]);
const weldedSeamDefault3 = ref<string[]>([]);
const weldedConnectionDefault = ref<string[]>([]);
const weldedConnectionDefault2 = ref<string[]>([]);
const weldedConnectionDefault3 = ref<string[]>([]);
const weldedPositionDefault = ref<string[]>([]);
const weldedPositionDefault2 = ref<string[]>([]);
const weldedPositionDefault3 = ref<string[]>([]);
const brandDefault = ref<string[]>([]);
const brandDefault2 = ref<string[]>([]);
const brandDefault3 = ref<string[]>([]);
const electrodeDefault = ref<string[]>([]);
const electrodeDefault2 = ref<string[]>([]);
const electrodeDefault3 = ref<string[]>([]);

//значения вариационных параметров для отпрпавки в БД
const stigmaVal = ref<string[]>([]);
const weldingMethodVal = ref<
  Array<ItemsVal[]> | ItemsVal[] | string[] | undefined
>([]);
const weldedTypeVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const weldedSeamVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const weldedConnectionVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const weldedPositionVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const axesPositionVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const weldedJointVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const preheatingVal = ref<string[]>([]);
const heatTreatmentVal = ref<string[]>([]);
const brandVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const thicknessVal = ref<string[]>([]);
const diameterVal = ref<string[]>([]);
const electrodeVal = ref<Array<ItemsVal[]> | ItemsVal[] | undefined>([]);
const fluxVal = ref<string[]>([]);

//список option в мультиселекте
const optionsWeldedPosition: ICheckboxGroupOption[] = [];
const optionsAxesPosition: ICheckboxGroupOption[] = [];
const optionsWeldedJoint: ICheckboxGroupOption[] = [];
const optionsWeldedType: ICheckboxGroupOption[] = [];
const optionsWeldedSeam: ICheckboxGroupOption[] = [];
const optionsWeldedConnection: ICheckboxGroupOption[] = [];
const optionsBrand: ICheckboxGroupOption[] = [];
const optionsElectrode: ICheckboxGroupOption[] = [];
const optionsComission: ICheckboxGroupOption[] = [];

//значение для групп технических устройств
const checkboxDropdownAccess = ref<ICheckboxDropdownItem[]>([]);
const checkboxDropdownAccessItems = ref<ICheckboxDropdownItem[]>([]);

onMounted(async () => {
  //лоадер
  loading.value = true;

  //link для загрузки с сервера
  const linkQualifyingRank = "certificate-qualifying-rank";
  const linkAttestationType = "certificate-attestation-type";
  const linkWeldingMethod = "certificate-welding-method";
  const linkWeldedType = "certificate-welded-type";
  const linkWeldedSeam = "certificate-welded-seam";
  const linkWeldedConnection = "certificate-welded-connection";
  const linkWeldedPosition = "certificate-welded-position";
  const linkAxesPosition = "certificate-axes-position";
  const linkWeldedJoint = "certificate-welded-joint";
  const linkBrand = "certificate-brand";
  const linkElectrode = "certificate-electrode";
  const linkComission = "certificate-comission";
  const linkControl = "certificate-control";
  const linkAccess = "certificate-access";
  const linkAccessItem = "certificate-access-item";
  const linkGrade = "certificate-grade";
  const linkTextHead = "certificate-text-head";

  //загрузка значений в store из БД на сервере (выполнение в store экшена load):
  await store.dispatch("certItem/load", linkQualifyingRank);
  await store.dispatch("certItem/load", linkAttestationType);
  await store.dispatch("certItem/load", linkWeldingMethod);
  await store.dispatch("certItem/load", linkWeldedType);
  await store.dispatch("certItem/load", linkWeldedSeam);
  await store.dispatch("certItem/load", linkWeldedConnection);
  await store.dispatch("certItem/load", linkWeldedPosition);
  await store.dispatch("certItem/load", linkAxesPosition);
  await store.dispatch("certItem/load", linkWeldedJoint);
  await store.dispatch("certItem/load", linkBrand);
  await store.dispatch("certItem/load", linkElectrode);
  await store.dispatch("certItem/load", linkComission);
  await store.dispatch("certItem/load", linkControl);
  await store.dispatch("certItem/load", linkAccess);
  await store.dispatch("certItem/load", linkAccessItem);
  await store.dispatch("certItem/load", linkGrade);
  await store.dispatch("certItem/load", linkTextHead);

  // возвращаем значение из store
  const dataAccesses = store.getters["certItem/certAccesses"];
  const dataAccessItems = store.getters["certItem/certAccessItems"];
  const dataWeldedPositions = store.getters["certItem/certWeldedPositions"];
  const dataAxesPositions = store.getters["certItem/certAxesPositions"];
  const dataWeldedJoints = store.getters["certItem/certWeldedJoints"];
  const dataWeldedTypes = store.getters["certItem/certWeldedTypes"];
  const dataWeldedSeams = store.getters["certItem/certWeldedSeams"];
  const dataWeldedConnections = store.getters["certItem/certWeldedConnections"];
  const dataBrands = store.getters["certItem/certBrands"];
  const dataElectrodes = store.getters["certItem/certElectrodes"];
  const dataComissions = store.getters["certItem/certComissions"];

  //добавляем полученные значения в массив options
  dataWeldedPositions.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsWeldedPosition.push(newItem);
  });
  dataAxesPositions.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsAxesPosition.push(newItem);
  });
  dataWeldedJoints.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsWeldedJoint.push(newItem);
  });

  dataWeldedTypes.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsWeldedType.push(newItem);
  });
  dataWeldedSeams.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsWeldedSeam.push(newItem);
  });
  dataWeldedConnections.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsWeldedConnection.push(newItem);
  });
  dataBrands.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsBrand.push(newItem);
  });
  dataElectrodes.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsElectrode.push(newItem);
  });
  dataComissions.forEach((item: IOptionsItem) => {
    const newItem = Object.assign(item, { checked: false });
    optionsComission.push(newItem);
  });

  //добавляем значение в input
  textHead.value = store.getters["certItem/certTextHeads"][0].value;

  //заносим значение групп технических устройств
  checkboxDropdownAccess.value = dataAccesses;
  checkboxDropdownAccessItems.value = dataAccessItems;

  weldedJoint.value = [];
  weldedJointScope.value = [];
  axesPosition.value = [];
  axesPositionScope.value = [];

  //Значения по умолчанию для создания вкладыша
  if (props.certValues?.id && props.certSubmit == "create") {
    numOldCert.value = props.certValues.numCertificate;
    dateOldCert.value = dateFormatForInput(props.certValues.date);
  }

  if (props.certValues?.id || props.certValues?._id) {
    firstname.value = props.certValues.firstname;
    secondname.value = props.certValues.secondname;
    lastname.value = props.certValues.lastname;
    passport.value = props.certValues.passport;
    birthday.value = dateFormatForInput(props.certValues.birthday);
    work.value = props.certValues.work;
    workYears.value = props.certValues.workYears;
    qualifyingRank.value = props.certValues.qualifyingRank;
  }

  //Значения для редактирования вкладыша
  if (
    props.certValues?.numOldCert &&
    props.certValues?.dateOldCert &&
    props.certSubmit == "edit"
  ) {
    numOldCert.value = props.certValues.numOldCert;
    dateOldCert.value = dateFormatForInput(props.certValues.dateOldCert);
  }

  //Значения по умолчанию для редактирования
  if (props.certValues?._id && props.certSubmit == "edit") {
    certType.value = props.certValues.certType;
    date.value = dateFormatForInput(props.certValues.date);
    numProtocol.value = props.certValues.numProtocol;
    textHead.value = props.certValues.textHead;
    attestationType.value = props.certValues.attestationType;

    stigmaGeneral.value = props.certValues.stigmaGeneral;
    stigma.value = props.certValues.stigma[0];
    if (props.certValues.stigma[1]) {
      stigma2.value = props.certValues.stigma[1];
    }
    if (props.certValues.stigma[2]) {
      stigma3.value = props.certValues.stigma[2];
    }

    weldingMethod.value = props.certValues.weldingMethod[0];
    weldingMethodScope.value = props.certValues.weldingMethodScope;
    if (props.certValues.weldingMethod[1]) {
      weldingMethod2.value = props.certValues.weldingMethod[1];
    }
    if (props.certValues.weldingMethod[2]) {
      weldingMethod3.value = props.certValues.weldingMethod[2];
    }

    if (certType.value == "fittings") {
      preheating.value = "-";
      heatTreatment.value = "-";

      if (props.certValues.axesPosition && props.certValues.axesPosition[0]) {
        axesPosition.value = props.certValues.axesPosition[0];
      }
      if (props.certValues.weldedJoint && props.certValues.weldedJoint[0]) {
        weldedJoint.value = props.certValues.weldedJoint[0];
      }
      if (props.certValues.weldedJointScope.length) {
        weldedJointScope.value = props.certValues.weldedJointScope;
      }
      if (props.certValues.axesPositionScope.length) {
        axesPositionScope.value = props.certValues.axesPositionScope;
      }
    } else if (
      certType.value == "sheetPipe" &&
      props.certValues.preheating &&
      props.certValues.heatTreatment
    ) {
      preheating.value = props.certValues.preheating[0];
      heatTreatment.value = props.certValues.heatTreatment[0];
      weldedJoint.value = [];
      weldedJointScope.value = [];
      axesPosition.value = [];
      axesPositionScope.value = [];
    }

    if (props.certValues.preheating && props.certValues.preheating[1]) {
      preheating2.value = props.certValues.preheating[1];
    }
    if (props.certValues.preheating && props.certValues.preheating[2]) {
      preheating3.value = props.certValues.preheating[2];
    }

    if (props.certValues.heatTreatment && props.certValues.heatTreatment[1]) {
      heatTreatment2.value = props.certValues.heatTreatment[1];
    }
    if (props.certValues.heatTreatment && props.certValues.heatTreatment[2]) {
      heatTreatment3.value = props.certValues.heatTreatment[2];
    }

    thickness.value = props.certValues.thickness[0];
    thicknessScope.value = props.certValues.thicknessScope;
    if (props.certValues.thickness[1]) {
      thickness2.value = props.certValues.thickness[1];
    }
    if (props.certValues.thickness[2]) {
      thickness3.value = props.certValues.thickness[2];
    }

    diameter.value = props.certValues.diameter[0];
    diameterScope.value = props.certValues.diameterScope;
    if (props.certValues.diameter[1]) {
      diameter2.value = props.certValues.diameter[1];
    }
    if (props.certValues.diameter[2]) {
      diameter3.value = props.certValues.diameter[2];
    }

    flux.value = props.certValues.flux[0];
    fluxScope.value = props.certValues.fluxScope;

    if (props.certValues.flux[1]) {
      flux2.value = props.certValues.flux[1];
    }
    if (props.certValues.flux[2]) {
      flux3.value = props.certValues.flux[2];
    }

    weldedType.value = props.certValues.weldedType[0];
    weldedTypeDefault.value = props.certValues.weldedType[0];
    weldedTypeDefault2.value = props.certValues.weldedType[1];
    weldedTypeDefault3.value = props.certValues.weldedType[2];
    weldedSeam.value = props.certValues.weldedSeam[0];
    weldedSeamDefault.value = props.certValues.weldedSeam[0];
    weldedSeamDefault2.value = props.certValues.weldedSeam[1];
    weldedSeamDefault3.value = props.certValues.weldedSeam[2];
    weldedConnection.value = props.certValues.weldedConnection[0];
    weldedConnectionDefault.value = props.certValues.weldedConnection[0];
    weldedConnectionDefault2.value = props.certValues.weldedConnection[1];
    weldedConnectionDefault3.value = props.certValues.weldedConnection[2];
    weldedPosition.value = props.certValues.weldedPosition[0];
    weldedPositionDefault.value = props.certValues.weldedPosition[0];
    weldedPositionDefault2.value = props.certValues.weldedPosition[1];
    weldedPositionDefault3.value = props.certValues.weldedPosition[2];
    brand.value = props.certValues.brand[0];
    brandDefault.value = props.certValues.brand[0];
    brandDefault2.value = props.certValues.brand[1];
    brandDefault3.value = props.certValues.brand[2];
    electrode.value = props.certValues.electrode[0];
    electrodeDefault.value = props.certValues.electrode[0];
    electrodeDefault2.value = props.certValues.electrode[1];
    electrodeDefault3.value = props.certValues.electrode[2];

    console.log(props.certValues.weldedType[0]);
    console.log(weldedTypeDefault.value);

    weldedTypeScope.value = props.certValues.weldedTypeScope;
    weldedSeamScope.value = props.certValues.weldedSeamScope;
    weldedConnectionScope.value = props.certValues.weldedConnectionScope;
    weldedPositionScope.value = props.certValues.weldedPositionScope;

    brandScope.value = props.certValues.brandScope;
    electrodeScope.value = props.certValues.electrodeScope;
    auxiliaryScope.value = props.certValues.auxiliaryScope;

    expiration.value = dateFormatForInput(props.certValues.expiration);
    comission.value = props.certValues.comission;
    numCertificate.value = props.certValues.numCertificate;

    npa.value = props.certValues.npa;
    grade.value = props.certValues.grade;
    decision.value = props.certValues.decision;
    accesses.value = props.certValues.accesses;

    //вносим текущие(загруженные с сервера) значения в переменные для отправки на сервер
    stigmaVal.value = props.certValues.stigma;
    weldingMethodVal.value = props.certValues.weldingMethod;
    weldedTypeVal.value = props.certValues.weldedType;
    weldedSeamVal.value = props.certValues.weldedSeam;
    weldedConnectionVal.value = props.certValues.weldedConnection;
    weldedPositionVal.value = props.certValues.weldedPosition;
    weldedJointVal.value = props.certValues.weldedJoint;
    axesPositionVal.value = props.certValues.axesPosition;
    brandVal.value = props.certValues.brand;
    thicknessVal.value = props.certValues.thickness;
    diameterVal.value = props.certValues.diameter;
    electrodeVal.value = props.certValues.electrode;
    fluxVal.value = props.certValues.flux;
    controls.value = props.certValues.controls;
    if (props.certValues.preheating) {
      preheatingVal.value = props.certValues.preheating;
    }
    if (props.certValues.heatTreatment) {
      heatTreatmentVal.value = props.certValues.heatTreatment;
    }

    //значения по умолчанию для мультичекбоксов, зависимых от типа протокола
    if (props.certValues.axesPosition && props.certValues.axesPosition[0]) {
      axesPositionDefault.value = props.certValues.axesPosition[0];
    }
    if (props.certValues.axesPosition && props.certValues.axesPosition[1]) {
      axesPositionDefault2.value = props.certValues.axesPosition[1];
    }
    if (props.certValues.axesPosition && props.certValues.axesPosition[2]) {
      axesPositionDefault3.value = props.certValues.axesPosition[2];
    }

    axesPositionScopeDefault.value = props.certValues.axesPositionScope;

    if (props.certValues.weldedJoint && props.certValues.weldedJoint[0]) {
      weldedJointDefault.value = props.certValues.weldedJoint[0];
    }
    if (props.certValues.weldedJoint && props.certValues.weldedJoint[1]) {
      weldedJointDefault2.value = props.certValues.weldedJoint[1];
    }
    if (props.certValues.weldedJoint && props.certValues.weldedJoint[2]) {
      weldedJointDefault3.value = props.certValues.weldedJoint[2];
    }

    weldedJointScopeDefault.value = props.certValues.weldedJointScope;
  }

  //лоадер
  loading.value = false;
});

//заносим значения мультичекбоксов
const onCheckedWeldedPosition = (data: ICheckboxGroupValues) => {
  if (!weldedPosition.value) {
    weldedPosition.value = [];
  }

  if (data.values.length == 0 && weldedPositionVal.value) {
    weldedPosition.value = undefined;
    weldedPositionVal.value[0] = undefined;
  } else if (weldedPositionVal.value) {
    weldedPosition.value = data.values;
    weldedPositionVal.value[0] = data.values;
  }
};
const onCheckedWeldedPosition2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedPositionVal.value) {
    if (weldedPositionVal.value.length == 2) {
      weldedPositionVal.value.splice(1, 1);
    } else if (weldedPositionVal.value) {
      weldedPositionVal.value[1] = "";
    }
  } else if (weldedPositionVal.value) {
    weldedPositionVal.value[1] = data.values;
  }
};
const onCheckedWeldedPosition3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedPositionVal.value) {
    if (
      weldedPositionVal.value[1] == "" ||
      weldedPositionVal.value[1] == null
    ) {
      weldedPositionVal.value.splice(1, 2);
    } else if (weldedPositionVal.value.length == 3) {
      weldedPositionVal.value.splice(2, 1);
    }
  } else if (weldedPositionVal.value) {
    weldedPositionVal.value[2] = data.values;
  }
};

const onCheckedWeldedJoint = (data: ICheckboxGroupValues) => {
  if (!weldedJoint.value) {
    weldedJoint.value = [];
  }

  if (data.values.length == 0 && weldedJointVal.value) {
    weldedJoint.value = undefined;
    weldedJointVal.value[0] = undefined;
  } else if (weldedJointVal.value) {
    weldedJoint.value = data.values;
    weldedJointVal.value[0] = data.values;
  }
};
const onCheckedWeldedJoint2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0) {
    if (weldedJointVal.value?.length == 2) {
      weldedJointVal.value.splice(1, 1);
    } else if (weldedJointVal.value) {
      weldedJointVal.value[1] = "";
    }
  } else if (weldedJointVal.value) {
    weldedJointVal.value[1] = data.values;
  }
};
const onCheckedWeldedJoint3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedJointVal.value) {
    if (weldedJointVal.value[1] == "" || weldedJointVal.value[1] == null) {
      weldedJointVal.value.splice(1, 2);
    } else if (weldedJointVal.value.length == 3) {
      weldedJointVal.value.splice(2, 1);
    }
  } else if (weldedJointVal.value) {
    weldedJointVal.value[2] = data.values;
  }
};

const onCheckedAxesPosition = (data: ICheckboxGroupValues) => {
  if (!axesPosition.value) {
    axesPosition.value = [];
  }

  if (data.values.length == 0 && axesPositionVal.value) {
    axesPosition.value = undefined;
    axesPositionVal.value[0] = undefined;
  } else if (axesPositionVal.value) {
    axesPosition.value = data.values;
    axesPositionVal.value[0] = data.values;
  }
};
const onCheckedAxesPosition2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && axesPositionVal.value) {
    if (axesPositionVal.value.length == 2) {
      axesPositionVal.value.splice(1, 1);
    } else {
      axesPositionVal.value[1] = "";
    }
  } else if (axesPositionVal.value) {
    axesPositionVal.value[1] = data.values;
  }
};
const onCheckedAxesPosition3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && axesPositionVal.value) {
    if (axesPositionVal.value[1] == "" || axesPositionVal.value[1] == null) {
      axesPositionVal.value.splice(1, 2);
    } else if (axesPositionVal.value.length == 3) {
      axesPositionVal.value.splice(2, 1);
    }
  } else if (axesPositionVal.value) {
    axesPositionVal.value[2] = data.values;
  }
};

const onCheckedWeldedType = (data: ICheckboxGroupValues) => {
  if (!weldedType.value) {
    weldedType.value = [];
  }

  if (data.values.length == 0 && weldedTypeVal.value) {
    weldedType.value = undefined;
    weldedTypeVal.value[0] = undefined;
  } else if (weldedTypeVal.value) {
    weldedType.value = data.values;
    weldedTypeVal.value[0] = data.values;
  }
};
const onCheckedWeldedType2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedTypeVal.value) {
    if (weldedTypeVal.value.length == 2) {
      weldedTypeVal.value.splice(1, 1);
    } else {
      weldedTypeVal.value[1] = "";
    }
  } else if (weldedTypeVal.value) {
    weldedTypeVal.value[1] = data.values;
  }
};
const onCheckedWeldedType3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedTypeVal.value) {
    if (weldedTypeVal.value[1] == "" || weldedTypeVal.value[1] == null) {
      weldedTypeVal.value.splice(1, 2);
    } else if (weldedTypeVal.value.length == 3) {
      weldedTypeVal.value.splice(2, 1);
    }
  } else if (weldedTypeVal.value) {
    weldedTypeVal.value[2] = data.values;
  }
};

const onCheckedWeldedSeam = (data: ICheckboxGroupValues) => {
  if (!weldedSeam.value) {
    weldedSeam.value = [];
  }

  if (data.values.length == 0 && weldedSeamVal.value) {
    weldedSeam.value = undefined;
    weldedSeamVal.value[0] = undefined;
  } else if (weldedSeamVal.value) {
    weldedSeam.value = data.values;
    weldedSeamVal.value[0] = data.values;
  }
};
const onCheckedWeldedSeam2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedSeamVal.value) {
    if (weldedSeamVal.value.length == 2) {
      weldedSeamVal.value.splice(1, 1);
    } else {
      weldedSeamVal.value[1] = "";
    }
  } else if (weldedSeamVal.value) {
    weldedSeamVal.value[1] = data.values;
  }
};
const onCheckedWeldedSeam3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedSeamVal.value) {
    if (weldedSeamVal.value[1] == "" || weldedSeamVal.value[1] == null) {
      weldedSeamVal.value.splice(1, 2);
    } else if (weldedSeamVal.value.length == 3) {
      weldedSeamVal.value.splice(2, 1);
    }
  } else if (weldedSeamVal.value) {
    weldedSeamVal.value[2] = data.values;
  }
};
const onCheckedWeldedConnection = (data: ICheckboxGroupValues) => {
  if (!weldedConnection.value) {
    weldedConnection.value = [];
  }

  if (data.values.length == 0 && weldedConnectionVal.value) {
    weldedConnection.value = undefined;
    weldedConnectionVal.value[0] = undefined;
  } else if (weldedConnectionVal.value) {
    weldedConnection.value = data.values;
    weldedConnectionVal.value[0] = data.values;
  }
};
const onCheckedWeldedConnection2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedConnectionVal.value) {
    if (weldedConnectionVal.value.length == 2) {
      weldedConnectionVal.value.splice(1, 1);
    } else {
      weldedConnectionVal.value[1] = "";
    }
  } else if (weldedConnectionVal.value) {
    weldedConnectionVal.value[1] = data.values;
  }
};
const onCheckedWeldedConnection3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && weldedConnectionVal.value) {
    if (
      weldedConnectionVal.value[1] == "" ||
      weldedConnectionVal.value[1] == null
    ) {
      weldedConnectionVal.value.splice(1, 2);
    } else if (weldedConnectionVal.value.length == 3) {
      weldedConnectionVal.value.splice(2, 1);
    }
  } else if (weldedConnectionVal.value) {
    weldedConnectionVal.value[2] = data.values;
  }
};
const onCheckedBrand = (data: ICheckboxGroupValues) => {
  if (!brand.value) {
    brand.value = [];
  }

  if (data.values.length == 0 && brandVal.value) {
    brand.value = undefined;
    brandVal.value[0] = undefined;
  } else if (brandVal.value) {
    brand.value = data.values;
    brandVal.value[0] = data.values;
  }
};
const onCheckedBrand2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && brandVal.value) {
    if (brandVal.value.length == 2) {
      brandVal.value.splice(1, 1);
    } else {
      brandVal.value[1] = "";
    }
  } else if (brandVal.value) {
    brandVal.value[1] = data.values;
  }
};
const onCheckedBrand3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && brandVal.value) {
    if (brandVal.value[1] == "" || brandVal.value[1] == null) {
      brandVal.value.splice(1, 2);
    } else if (brandVal.value.length == 3) {
      brandVal.value.splice(2, 1);
    }
  } else if (brandVal.value) {
    brandVal.value[2] = data.values;
  }
};
const onCheckedElectrode = (data: ICheckboxGroupValues) => {
  if (!electrode.value) {
    electrode.value = [];
  }

  if (data.values.length == 0 && electrodeVal.value) {
    electrode.value = undefined;
    electrodeVal.value[0] = undefined;
  } else if (electrodeVal.value) {
    electrode.value = data.values;
    electrodeVal.value[0] = data.values;
  }
};
const onCheckedElectrode2 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && electrodeVal.value) {
    if (electrodeVal.value.length == 2) {
      electrodeVal.value.splice(1, 1);
    } else {
      electrodeVal.value[1] = "";
    }
  } else if (electrodeVal.value) {
    electrodeVal.value[1] = data.values;
  }
};
const onCheckedElectrode3 = (data: ICheckboxGroupValues) => {
  if (data.values.length == 0 && electrodeVal.value) {
    if (electrodeVal.value[1] == "" || electrodeVal.value[1] == null) {
      electrodeVal.value.splice(1, 2);
    } else if (electrodeVal.value.length == 3) {
      electrodeVal.value.splice(2, 1);
    }
  } else if (electrodeVal.value) {
    electrodeVal.value[2] = data.values;
  }
};

const onCheckedQualityControls = (
  data: IQualityControlEmitChangeControlsItem[]
) => {
  if (!data.values || data.values.length == 0 || !data.values[0]) {
    controls.value = undefined;
  } else {
    controls.value = data.values;
  }
};

const onCheckedComission = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    comission.value = undefined;
  } else {
    comission.value = data.values;
  }
};

const onCheckedWeldedPositionScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    weldedPositionScope.value = undefined;
  } else {
    weldedPositionScope.value = data.values;
  }
};
const onCheckedAxesPositionScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    axesPositionScope.value = undefined;
  } else {
    axesPositionScope.value = data.values;
  }
};
const onCheckedWeldedJointScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    weldedJointScope.value = undefined;
  } else {
    weldedJointScope.value = data.values;
  }
};
const onCheckedWeldedTypeScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    weldedTypeScope.value = undefined;
  } else {
    weldedTypeScope.value = data.values;
  }
};
const onCheckedWeldedSeamScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    weldedSeamScope.value = undefined;
  } else {
    weldedSeamScope.value = data.values;
  }
};
const onCheckedWeldedConnectionScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    weldedConnectionScope.value = undefined;
  } else {
    weldedConnectionScope.value = data.values;
  }
};
const onCheckedBrandScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    brandScope.value = undefined;
  } else {
    brandScope.value = data.values;
  }
};
const onCheckedElectrodeScope = (data: ICheckboxGroupValues) => {
  if (!data.values.length) {
    electrodeScope.value = undefined;
  } else {
    electrodeScope.value = data.values;
  }
};

//Заносим значения селектов
const selectQualifyingRank = (value: ISelectValue) => {
  qualifyingRank.value = value.value;
};
const selectAttestationType = (value: ISelectValue) => {
  attestationType.value = value.value;
};
const selectWeldingMethod1 = (value: ISelectValue) => {
  weldingMethod.value = value.value;

  onChangeItem(weldingMethodVal.value, 0, weldingMethod.value);
};
const selectWeldingMethod2 = (value: ISelectValue) => {
  weldingMethod2.value = value.value;
  onChangeItem(weldingMethodVal.value, 1, weldingMethod2.value);
};
const selectWeldingMethod3 = (value: ISelectValue) => {
  weldingMethod3.value = value.value;
  onChangeItem(weldingMethodVal.value, 2, weldingMethod3.value);
};
const selectGrade = (value: ISelectValue) => {
  grade.value = value.value;
};
const selectWeldingMethodScope = (value: ISelectValue) => {
  weldingMethodScope.value = value.value;
};

//функция добавления значений Групп технических устройств в массив
const onCheckedAccessSubItems = (data: ICheckboxDropdownCheckedValues) => {
  if (!accesses.value) {
    accesses.value = [];
  }

  //поиск элемента в массиаве
  const idx = accesses.value.findIndex(
    (item: ICheckboxDropdownDefaultItem) => item.item == data.values.item
  );

  //если уже есть в массиве
  if (idx > -1) {
    //заменить на новое значение
    accesses.value.splice(idx, 1, data.values);

    //если снимаем все значения подгрупп
    if (data.values.values && !data.values.values.length) {
      accesses.value.splice(idx, 1);

      if (!accesses.value.length) {
        accesses.value = undefined;
      }
    }
  } else {
    //если нет в массиве, добавить
    if (data.values) {
      accesses.value.push(data.values);
    }
  }
};

//функция смены тип протокола
const changeCertType = () => {
  if (certType.value == "sheetPipe") {
    weldedJoint.value = [];
    weldedJointScope.value = [];
    axesPosition.value = [];
    axesPositionScope.value = [];
    weldedJointVal.value = [];
    axesPositionVal.value = [];

    axesPositionDefault.value = [];
    axesPositionDefault2.value = [];
    axesPositionDefault3.value = [];
    axesPositionScopeDefault.value = [];
    weldedJointDefault.value = [];
    weldedJointDefault2.value = [];
    weldedJointDefault3.value = [];
    weldedJointScopeDefault.value = [];

    preheating.value = "";
    preheating2.value = "";
    preheating3.value = "";
    preheatingVal.value = [];

    heatTreatment.value = "";
    heatTreatment2.value = "";
    heatTreatment3.value = "";
    heatTreatmentVal.value = [];
  } else if (certType.value == "fittings") {
    weldedJoint.value = undefined;
    weldedJointScope.value = undefined;
    axesPosition.value = undefined;
    axesPositionScope.value = undefined;
    weldedJointVal.value = [];
    axesPositionVal.value = [];

    preheating.value = "-";
    preheating2.value = "";
    preheating3.value = "";

    heatTreatment.value = "-";
    heatTreatment2.value = "";
    heatTreatment3.value = "";

    preheatingVal.value = [];
    heatTreatmentVal.value = [];
  }
};

//список option в селекте
const optionsQualifyingRank = computed(
  () => store.getters["certItem/certQualifyingRanks"]
);
const optionsAttestationType = computed(
  () => store.getters["certItem/certAttestationTypes"]
);
const optionsWeldingMethod = computed(
  () => store.getters["certItem/certWeldingMethods"]
);

const optionsControl = computed(() => store.getters["certItem/certControls"]);
const optionsGrade = computed(() => store.getters["certItem/certGrades"]);

//обработчик изменения полей с вариациями значений
const onChangeItem = (item: string[], itemNum: number, currentItem: string) => {
  if (itemNum == 1) {
    if (currentItem.length == 0) {
      if (item.length == 2) {
        item.splice(1, 1);
      } else {
        item[itemNum] = currentItem;
      }
    } else {
      item[itemNum] = currentItem;
    }
  } else if (itemNum == 2) {
    if (currentItem.length == 0) {
      if (item[1] == "" || item[1] == null) {
        item.splice(1, 2);
      } else if (item.length == 3) {
        item.splice(2, 1);
      }
    } else {
      item[itemNum] = currentItem;
      if (item[1] == null) {
        item[1] = "";
      }
    }
  } else {
    item[itemNum] = currentItem;
  }
};

//Vee-validate
const { handleSubmit } = useForm();

const { value: date, errorMessage: dError } = useField<string>(
  "date",
  yup.string().trim().required("Пожалуйста, введите дату протокола")
);

const { value: numProtocol, errorMessage: numProtError } = useField<string>(
  "numProtocol",
  yup.string().trim().required("Пожалуйста, введите номер протокола")
);

const { value: textHead, errorMessage: tHeadError } = useField<string>(
  "textHead",
  yup.string().trim().required("Пожалуйста, введите текст в шапке протокола")
);

const { value: firstname, errorMessage: fNameError } = useField<string>(
  "firstname",
  yup.string().trim().required("Пожалуйста, введите Фамилию")
);

const { value: secondname, errorMessage: sNameError } = useField<string>(
  "secondname",
  yup.string().trim().required("Пожалуйста, введите Имя")
);

const { value: lastname, errorMessage: lNameError } = useField<string>(
  "lastname",
  yup.string().trim().required("Пожалуйста, введите Отчество")
);

const { value: birthday, errorMessage: bDayError } = useField<string>(
  "birthday",
  yup.string().trim().required("Пожалуйста, введите дату рождения")
);

const { value: passport, errorMessage: passportError } = useField<string>(
  "passport",
  yup.string().trim().required("Пожалуйста, введите серию и номер паспорта")
);

const { value: numOldCert, errorMessage: numOldCertError } = useField<string>(
  "numOldCert",
  yup.string().trim()
);

const { value: dateOldCert, errorMessage: dateOldCertError } = useField<string>(
  "dateOldCert",
  yup.string().trim()
);

const { value: work, errorMessage: wError } = useField<string>(
  "work",
  yup.string().trim().required("Пожалуйста, введите место работы")
);

const { value: workYears, errorMessage: wYearsError } = useField<number>(
  "workYears",
  yup
    .number()
    .typeError("Пожалуйста, введите число")
    .required("Пожалуйста, введите стаж работы по сварке")
    .integer("Пожалуйста, введите целое число")
);

const { value: qualifyingRank, errorMessage: qRankError } = useField<string>(
  "qualifyingRank",
  yup.string().trim().required("Пожалуйста, введите квалификационный разряд")
);

const { value: attestationType, errorMessage: aTypeError } = useField<string>(
  "attestationType",
  yup.string().trim().required("Пожалуйста, введите вид аттестации")
);

const { value: stigma, errorMessage: sError } = useField<string>(
  "stigma",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите маркировку образца (клеймо)")
);

const { value: stigmaGeneral, errorMessage: sGError } = useField<string>(
  "stigmaGeneral",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите маркировку образца (клеймо)(общее значение)")
);

const { value: weldingMethod, errorMessage: wMethodError } = useField<string>(
  "weldingMethod",
  yup.string().trim().required("Пожалуйста, укажите способ сварки")
);
const { value: weldingMethodScope, errorMessage: wMethodSError } =
  useField<string>(
    "weldingMethodScope",
    yup.string().trim().required("Пожалуйста, укажите способ сварки")
  );

const { value: weldedType, errorMessage: wTypeError } = useField(
  "weldedType",
  yup.array().required("Пожалуйста, введите вид свариваемых деталей")
);
const { value: weldedTypeScope, errorMessage: wTypeSError } = useField(
  "weldedTypeScope",
  yup.array().required("Пожалуйста, введите вид свариваемых деталей")
);

const { value: weldedSeam, errorMessage: wSeamError } = useField(
  "weldedSeam",
  yup.array().required("Пожалуйста, укажите тип сварного шва")
);
const { value: weldedSeamScope, errorMessage: wSeamSError } = useField(
  "weldedSeamScope",
  yup.array().required("Пожалуйста, укажите тип сварного шва")
);
const { value: weldedConnection, errorMessage: wConnectionError } = useField(
  "weldedConnection",
  yup.array().required("Пожалуйста, укажите тип и вид соединения")
);
const { value: weldedConnectionScope, errorMessage: wConnectionSError } =
  useField(
    "weldedConnectionScope",
    yup.array().required("Пожалуйста, укажите тип и вид соединения")
  );

const { value: weldedPosition, errorMessage: wpError } = useField(
  "weldedPosition",
  yup.array().required("Пожалуйста, укажите положение при сварке")
);
const { value: weldedPositionScope, errorMessage: wpSError } = useField(
  "weldedPositionScope",
  yup.array().required("Пожалуйста, укажите положение при сварке")
);
const { value: axesPosition, errorMessage: apError } = useField(
  "axesPosition",
  yup.array().required("Пожалуйста, укажите положение осей стержней")
);
const { value: axesPositionScope, errorMessage: apSError } = useField(
  "axesPositionScope",
  yup.array().required("Пожалуйста, укажите положение осей стержней")
);
const { value: weldedJoint, errorMessage: wjError } = useField(
  "weldedJoint",
  yup.array().required("Пожалуйста, укажите тип сварного соединения")
);
const { value: weldedJointScope, errorMessage: wjSError } = useField(
  "weldedJointScope",
  yup.array().required("Пожалуйста, укажите тип сварного соединения")
);
const { value: preheating, errorMessage: pError } = useField<string>(
  "preheating",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите предварительный и сопутствующий подогрев")
);
const { value: heatTreatment, errorMessage: hTreatmentError } =
  useField<string>(
    "heatTreatment",
    yup.string().trim().required("Пожалуйста, введите термическую обработку")
  );
const { value: brand, errorMessage: bError } = useField(
  "brand",
  yup.array().required("Пожалуйста, укажите марку и группу")
);
const { value: brandScope, errorMessage: bSError } = useField(
  "brandScope",
  yup.array().required("Пожалуйста, укажите марку и группу")
);
const { value: thickness, errorMessage: tError } = useField<string>(
  "thickness",
  yup.string().trim().required("Пожалуйста, введите толщину образца (мм)")
);
const { value: thicknessScope, errorMessage: tSError } = useField<string>(
  "thicknessScope",
  yup.string().trim().required("Пожалуйста, введите толщину образца (мм)")
);
const { value: diameter, errorMessage: diameterError } = useField<string>(
  "diameter",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите наружный диаметр трубы (мм)")
);
const { value: diameterScope, errorMessage: diameterSError } = useField<string>(
  "diameterScope",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите наружный диаметр трубы (мм)")
);
const { value: electrode, errorMessage: eError } = useField(
  "electrode",
  yup.array().required("Пожалуйста, укажите электрод или присадочную проволоку")
);
const { value: electrodeScope, errorMessage: eSError } = useField(
  "electrodeScope",
  yup.array().required("Пожалуйста, укажите электрод или присадочную проволоку")
);
const { value: flux, errorMessage: fError } = useField<string>(
  "flux",
  yup.string().trim().required("Пожалуйста, введите защитный газ и флюс")
);
const { value: fluxScope, errorMessage: fSError } = useField<string>(
  "fluxScope",
  yup.string().trim().required("Пожалуйста, введите защитный газ и флюс")
);

const { value: npa, errorMessage: npaError } = useField<string>(
  "npa",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите наименование НПА по нормам оценки качества")
);
const { value: auxiliaryScope, errorMessage: auxiliarySError } =
  useField<string>(
    "auxiliaryScope",
    yup
      .string()
      .trim()
      .required("Пожалуйста, введите вспомогательные материалы")
  );
const { value: grade, errorMessage: gError } = useField<string>(
  "grade",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите оценку теоретических знаний")
);
const { value: decision, errorMessage: decisionError } = useField<string>(
  "decision",
  yup.string().trim().required("Пожалуйста, введите решение комиссии")
);

const { value: expiration, errorMessage: expError } = useField<string>(
  "expiration",
  yup
    .string()
    .trim()
    .required("Пожалуйста, введите срок периодической аттестации")
);
const { value: comission, errorMessage: сError } = useField(
  "comission",
  yup.array().required("Пожалуйста, укажите аттестационную комиссию")
);
const { value: controls, errorMessage: controlsError } = useField(
  "controls",
  yup
    .array()
    .required(
      "Пожалуйста, укажите в первой сроке основного раздела данные контроля качества образца"
    )
);
const { value: accesses, errorMessage: accessesError } = useField<
  ICheckboxDropdownDefaultItem[] | undefined
>(
  "accesses",
  yup
    .array()
    .required(
      "Пожалуйста, укажите группы технических устройств опасных производственных объектов"
    )
);
const { value: numCertificate, errorMessage: numCertError } = useField<string>(
  "numCertificate",
  yup.string().trim().required("Пожалуйста, введите номер удостоверения")
);

//функция автоматического изменения даты окончания срока действия удостоверения
const dateChange = () => {
  let newDate: Date = new Date(<string>date.value);

  newDate.setFullYear(newDate.getFullYear() + 2);

  let month =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  let day =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();

  expiration.value = newDate.getFullYear() + "-" + month + "-" + day;
};

//Функция закрития модального окна
function closeModal() {
  modal.value = false;
}

//Функция показа модального окна
function showModal() {
  modal.value = true;
  setTimeout(() => {
    let systemModal = document.getElementById("systemModal");
    systemModal?.classList.add("show");
  }, 0);
}

// функция создания нового протокола удостоверения/вкладыша
const createCertificate = async () => {
  try {
    const values = {
      certType: certType.value,
      date: date.value,
      numProtocol: numProtocol.value,
      textHead: textHead.value,
      firstname: firstname.value,
      secondname: secondname.value,
      lastname: lastname.value,
      birthday: birthday.value,
      passport: passport.value,
      numOldCert: numOldCert.value,
      dateOldCert: dateOldCert.value,
      work: work.value,
      workYears: workYears.value,
      qualifyingRank: qualifyingRank.value,
      attestationType: attestationType.value,
      stigma: stigmaVal.value,
      stigmaGeneral: stigmaGeneral.value,
      weldingMethod: weldingMethodVal.value,
      weldedType: weldedTypeVal.value,
      weldedSeam: weldedSeamVal.value,
      weldedConnection: weldedConnectionVal.value,
      weldedPosition: weldedPositionVal.value,
      weldedJoint: weldedJointVal.value,
      axesPosition: axesPositionVal.value,
      preheating: preheatingVal.value,
      heatTreatment: heatTreatmentVal.value,
      brand: brandVal.value,
      thickness: thicknessVal.value,
      diameter: diameterVal.value,
      electrode: electrodeVal.value,
      flux: fluxVal.value,
      controls: controls.value,
      npa: npa.value,
      grade: grade.value,
      decision: decision.value,
      accesses: accesses.value,
      expiration: expiration.value,
      comission: comission.value,
      numCertificate: numCertificate.value,
      weldingMethodScope: weldingMethodScope.value,
      weldedTypeScope: weldedTypeScope.value,
      weldedSeamScope: weldedSeamScope.value,
      weldedConnectionScope: weldedConnectionScope.value,
      weldedPositionScope: weldedPositionScope.value,
      weldedJointScope: weldedJointScope.value,
      axesPositionScope: axesPositionScope.value,
      brandScope: brandScope.value,
      thicknessScope: thicknessScope.value,
      diameterScope: diameterScope.value,
      electrodeScope: electrodeScope.value,
      fluxScope: fluxScope.value,
      auxiliaryScope: auxiliaryScope.value,
    };

    let link: string = "certificate/create";

    if (props.certValues?.id) {
      link = "certificateSub/create";
      values.owner = props.certValues.id;
    }

    await store.dispatch(link, values);

    //переход на главную после создания
    router.push("/");
  } catch (e) {}
};

function onInvalidSubmit({ values, errors, results }) {
  if (errors) {
    store.dispatch("setMessage", {
      value: "Не все поля заполнены. Введите значения",
      type: "warning",
    });

    //закрыть модальное окно
    closeModal();
  }
}

//Функция сохранения изменений значений протокола
const updateCertificate = async () => {
  const id = props.certValues?._id;

  try {
    const values = {
      certType: certType.value,
      date: date.value,
      numProtocol: numProtocol.value,
      textHead: textHead.value,
      firstname: firstname.value,
      secondname: secondname.value,
      lastname: lastname.value,
      birthday: birthday.value,
      passport: passport.value,
      numOldCert: numOldCert.value,
      dateOldCert: dateOldCert.value,
      work: work.value,
      workYears: workYears.value,
      qualifyingRank: qualifyingRank.value,
      attestationType: attestationType.value,
      stigma: stigmaVal.value,
      stigmaGeneral: stigmaGeneral.value,
      weldingMethod: weldingMethodVal.value,
      weldedType: weldedTypeVal.value,
      weldedSeam: weldedSeamVal.value,
      weldedConnection: weldedConnectionVal.value,
      weldedPosition: weldedPositionVal.value,
      weldedJoint: weldedJointVal.value,
      axesPosition: axesPositionVal.value,
      preheating: preheatingVal.value,
      heatTreatment: heatTreatmentVal.value,
      brand: brandVal.value,
      thickness: thicknessVal.value,
      diameter: diameterVal.value,
      electrode: electrodeVal.value,
      flux: fluxVal.value,
      controls: controls.value,
      npa: npa.value,
      grade: grade.value,
      decision: decision.value,
      accesses: accesses.value,
      expiration: expiration.value,
      comission: comission.value,
      numCertificate: numCertificate.value,
      weldingMethodScope: weldingMethodScope.value,
      weldedTypeScope: weldedTypeScope.value,
      weldedSeamScope: weldedSeamScope.value,
      weldedConnectionScope: weldedConnectionScope.value,
      weldedPositionScope: weldedPositionScope.value,
      weldedJointScope: weldedJointScope.value,
      axesPositionScope: axesPositionScope.value,
      brandScope: brandScope.value,
      thicknessScope: thicknessScope.value,
      diameterScope: diameterScope.value,
      electrodeScope: electrodeScope.value,
      fluxScope: fluxScope.value,
      auxiliaryScope: auxiliaryScope.value,
    };

    // вызываем метод update для обновления записи в БД
    if (props.certValues?.owner) {
      await store.dispatch("certificateSub/update", { values, id });
    } else {
      await store.dispatch("certificate/update", { values, id });
    }

    //закрыть модальное окно
    closeModal();

    //скрыть форму редактирования
    emit("hide");
    emit("update");
  } catch (error) {
    //закрыть модальное окно
    closeModal();
  }
};

//Отправка формы на сервер
const onSubmit = handleSubmit(() => {
  if (props.certSubmit == "edit") {
    updateCertificate();
  } else if (props.certSubmit == "create") {
    createCertificate();
  }
}, onInvalidSubmit);
</script>

<style></style>
