<template>
  <app-page title="Удостоверение сварщика">
    <div v-if="auth" class="container-lg">
      <app-loader v-if="loading"></app-loader>
      <div v-else-if="certificate && !showEditFields && isId" class="pt-4">
        <div class="row">
          <h4 class="text-center mb-4">
            Удостоверение №{{ certificate.numCertificate }}
          </h4>

          <div
            v-if="certificateSubData.length"
            class="certificate-control btn-group btn-group-sm mb-4 d-flex"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <div class="certificate-control-item flex-fill">
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio"
                autocomplete="off"
                value="0"
                checked
                v-model="certs"
              />
              <label
                class="btn btn-outline-primary d-block h-100 rounded-0"
                for="btnradio"
                ><span
                  class="d-flex h-100 align-items-center justify-content-center"
                  >Протокол</span
                ></label
              >
            </div>
            <div
              v-for="(c, idx) in certificateSubData"
              :key="idx"
              class="certificate-control-item flex-fill"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                :id="'btnradio' + (idx + 1)"
                autocomplete="off"
                :value="idx + 1"
                v-model="certs"
              />
              <label
                class="btn btn-outline-primary d-block h-100 rounded-0"
                :for="'btnradio' + (idx + 1)"
                ><span
                  class="d-flex h-100 align-items-center justify-content-center"
                >
                  Вкладыш №{{ c.numCertificate }}
                </span></label
              >
            </div>
          </div>

          <div class="certificate " id="exportContent">
            <div class="certificate-header text-center mb-4">
              <div class="certificate-header__desc justify-content-center">
                <div class="desc-logo">
                  <img src="../assets/img/logo-200.png" alt="" />
                </div>
                <div class="desc-text text-center">
                  <p class="fw-bold line-height-print-1">
                    Общество с ограниченной ответственностью
                  </p>
                  <p class="fw-bold mb-1 line-height-print-1">
                    «ТЕХНОПАРК «УНИВЕРСИТЕТСКИЕ ТЕХНОЛОГИИ»
                  </p>
                  <p class="fs-print-9 line-height-print-09">
                    <span class="fw-bold">Юридический адрес:</span>
                    г. Донецк, Ворошиловский район, ул. Артема, д. 58, оф. 311
                  </p>
                  <p class="fs-print-9 line-height-print-09">
                    <span class="fw-bold">Фактический адрес:</span> г. Донецк,
                    Ворошиловский район, ул. Постышева, д. 52, оф. 13
                  </p>
                  <p class="fs-print-9 line-height-print-09">
                    <span class="fw-bold">Телефон:</span> +380 (71) 327-38-97.
                    <span class="fw-bold">Эл. почта:</span> 0623351828@mail.ru
                  </p>
                  <p class="fw-bold fs-print-9 line-height-print-09 mb-1">
                    Рабочее время с 9.00 до 17.00 (без перерыва)
                  </p>
                  <p class="fw-bold fs-print-8 line-height-print-08">
                    Свидетельство о гос. регистрации от 21.10.2015 г. АА03
                    №014242
                  </p>
                  <p class="fw-bold fs-print-8 line-height-print-08">
                    Идентификационный код: 50013084
                  </p>
                  <p class="fw-bold fs-print-8 line-height-print-08">
                    Т/счет: 40702810820260000449 в ЦРБ ДНР, БИК 310101001
                  </p>
                </div>
              </div>

              <div class="certificate-header__printlines">
                <table class="printlines">
                  <tbody>
                    <tr class="printline-first">
                      .
                    </tr>
                    <tr class="printline-second">
                      .
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="certificate-header__director justify-content-end">
                <div class="director text-start">
                  <p class="mb-0">Утверждаю</p>
                  <p>Директор</p>
                  <p class="mb-4">____________ Сотников А.Л.</p>
                </div>
              </div>
              <div class="certificate-header__title text-uppercase">
                Протокол
              </div>
              <p>Заседания аттестационной комиссии</p>
              <div
                class="certificate-header__info d-flex justify-content-between"
              >
                <div class="certificate-header__info-date">
                  от
                  {{ protocolDateFormat(certificate.date) }}
                </div>
                <div class="certificate-header__info-num">
                  {{ certificate.numProtocol }}
                </div>
              </div>
              <div class="certificate-header__comission">
                <p class="mb-0 mt-2 text-start">Комиссия в составе:</p>
                <table class="comission-table">
                  <tbody>
                    <tr>
                      <td>председатель комиссии</td>
                      <td>Сотников А.Л., III уровень (НАКС, ВИК)</td>
                    </tr>
                    <tr>
                      <td>члены комиссии:</td>
                      <td>
                        Пасечник С.Ю., III уровень (НАКС) <br />
                        Бабак К.Ю., III уровень (НАКС)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="certificate-body">
              <p class="text-head text-justify">
                {{ certificate.textHead }}
              </p>

              <div class="table-responsive">
                <table class="table-main w-100">
                  <tr class="d-flex">
                    <th scope="row">1.</th>
                    <td class="w-50">Фамилия</td>
                    <td class="w-50 border-bottom">
                      {{ certificate.firstname }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row"></th>
                    <td class="w-50">Имя</td>
                    <td class="w-50 border-bottom">
                      {{ certificate.secondname }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row"></th>
                    <td class="w-50">Отчество</td>
                    <td class="w-50 border-bottom">
                      {{ certificate.lastname }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">2.</th>
                    <td class="w-50">Дата рождения, паспорт</td>
                    <td class="w-50 border-bottom">
                      {{ dateFormat(certificate.birthday) }} г., паспорт
                      {{ certificate.passport }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">3.</th>
                    <td class="w-50">
                      Номер аттестационного удостоверения сварщика, дата выдачи
                      (при наличии)
                    </td>
                    <td
                      v-if="
                        (certificate.numOldCert && certificate.dateOldCert) ||
                          showEditFields
                      "
                      class="w-50 border-bottom"
                    >
                      {{
                        certificate.numOldCert
                          ? certificate.numOldCert + ", "
                          : ""
                      }}

                      {{
                        certificate.dateOldCert
                          ? dateFormat(certificate.dateOldCert)
                          : ""
                      }}
                    </td>
                    <td v-else class="w-50 border-bottom">
                      -
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">4.</th>
                    <td class="w-50"><b>Сведения о работе:</b></td>
                    <td class="w-50"></td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row"></th>
                    <td class="w-50">Место работы</td>
                    <td class="w-50 border-bottom">
                      {{ certificate.work }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row"></th>
                    <td class="w-50">Стаж работы по сварке (полных лет)</td>
                    <td class="w-50 border-bottom">
                      {{
                        certificate.workYears +
                          (certificate.workYears == 1 ||
                          certificate.workYears == 21 ||
                          certificate.workYears == 31 ||
                          certificate.workYears == 41 ||
                          certificate.workYears == 51 ||
                          certificate.workYears == 61 ||
                          certificate.workYears == 71 ||
                          certificate.workYears == 81 ||
                          certificate.workYears == 91
                            ? " год"
                            : certificate.workYears == 2 ||
                              certificate.workYears == 3 ||
                              certificate.workYears == 4 ||
                              certificate.workYears == 22 ||
                              certificate.workYears == 23 ||
                              certificate.workYears == 24 ||
                              certificate.workYears == 32 ||
                              certificate.workYears == 33 ||
                              certificate.workYears == 34 ||
                              certificate.workYears == 42 ||
                              certificate.workYears == 43 ||
                              certificate.workYears == 44 ||
                              certificate.workYears == 52 ||
                              certificate.workYears == 53 ||
                              certificate.workYears == 54 ||
                              certificate.workYears == 62 ||
                              certificate.workYears == 63 ||
                              certificate.workYears == 64 ||
                              certificate.workYears == 72 ||
                              certificate.workYears == 73 ||
                              certificate.workYears == 74 ||
                              certificate.workYears == 82 ||
                              certificate.workYears == 83 ||
                              certificate.workYears == 84 ||
                              certificate.workYears == 92 ||
                              certificate.workYears == 93 ||
                              certificate.workYears == 94
                            ? " года"
                            : " лет")
                      }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row"></th>
                    <td class="w-50">Квалификационный разряд</td>
                    <td class="w-50 border-bottom">
                      {{ certificate.qualifyingRank }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">5.</th>
                    <td class="w-50">Вид аттестации</td>
                    <td class="w-50 border-bottom">
                      {{ certificate.attestationType }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.</th>
                    <td class="">
                      <b>Характеристика контрольного сварного соединения:</b>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.1.</th>
                    <td class="w-50">Маркировка образца (клеймо)</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{ certificate.stigma[0] }}
                        </div>
                        <div
                          v-if="
                            certificate.stigma[1] ||
                              certificate.stigma.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{ certificate.stigma[1] || "" }}
                        </div>
                        <div
                          v-if="certificate.stigma[2]"
                          class="col-4 text-center border-start"
                        >
                          {{ certificate.stigma[2] || "" }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.2.</th>
                    <td class="w-50">Способ сварки</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{ certificate.weldingMethod[0] }}
                        </div>
                        <div
                          v-if="
                            certificate.weldingMethod[1] ||
                              certificate.weldingMethod.length > 1
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{ certificate.weldingMethod[1] || "" }}
                        </div>
                        <div
                          v-if="certificate.weldingMethod[2]"
                          class="col-4 text-center border-start"
                        >
                          {{ certificate.weldingMethod[2] || "" }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.3.</th>
                    <td class="w-50">Вид свариваемых деталей</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{
                            arrayFormat(certificate.weldedType[0]) + "" || ""
                          }}
                        </div>
                        <div
                          v-if="
                            certificate.weldedType[1] ||
                              certificate.weldedType.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{
                            arrayFormat(certificate.weldedType[1]) + "" || ""
                          }}
                        </div>
                        <div
                          v-if="certificate.weldedType[2]"
                          class="col-4 text-center border-start"
                        >
                          {{
                            arrayFormat(certificate.weldedType[2]) + "" || ""
                          }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.4.</th>
                    <td class="w-50">
                      Тип шва, вид и характеристика сварного соединения
                    </td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{
                            arrayFormat(certificate.weldedSeam[0]) +
                              ", " +
                              arrayFormat(certificate.weldedConnection[0])
                          }}
                        </div>
                        <div
                          v-if="
                            (certificate.weldedSeam[1] &&
                              certificate.weldedConnection[1]) ||
                              (certificate.weldedSeam.length > 1 &&
                                certificate.weldedConnection.length > 1)
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{
                            arrayFormat(certificate.weldedSeam[1]) +
                              (certificate.weldedSeam[1] ? ", " : "") +
                              arrayFormat(certificate.weldedConnection[1]) || ""
                          }}
                        </div>
                        <div
                          v-if="
                            certificate.weldedSeam[2] &&
                              certificate.weldedConnection[2]
                          "
                          class="col-4 text-center border-start"
                        >
                          {{
                            arrayFormat(certificate.weldedSeam[2]) +
                              ", " +
                              arrayFormat(certificate.weldedConnection[2]) || ""
                          }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.5.</th>
                    <td class="w-50">Положение при сварке</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                            'text-break',
                          ]"
                        >
                          {{ arrayFormat(certificate.weldedPosition[0]) + "" }}
                        </div>
                        <div
                          v-if="
                            certificate.weldedPosition[1] ||
                              certificate.weldedPosition.length > 1
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'text-break',
                            'border-start',
                          ]"
                        >
                          {{
                            arrayFormat(certificate.weldedPosition[1]) + "" ||
                              ""
                          }}
                        </div>
                        <div
                          v-if="certificate.weldedPosition[2]"
                          class="col-4 text-center border-start text-break"
                        >
                          {{
                            arrayFormat(certificate.weldedPosition[2]) + "" ||
                              ""
                          }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.6.</th>
                    <td v-if="certificate.certType == 'sheetPipe'" class="w-50">
                      Предварительный и сопутствующий подогрев
                    </td>
                    <td v-if="certificate.certType == 'fittings'" class="w-50">
                      Положение осей стержней
                    </td>
                    <td class="w-50 border-bottom">
                      <div
                        v-if="certificate.certType == 'sheetPipe'"
                        class="row"
                      >
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{ certificate.preheating[0] }}
                        </div>
                        <div
                          v-if="
                            certificate.preheating[1] ||
                              certificate.preheating.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{ certificate.preheating[1] || "" }}
                        </div>
                        <div
                          v-if="certificate.preheating[2]"
                          class="col-4 text-center border-start"
                        >
                          {{ certificate.preheating[2] || "" }}
                        </div>
                      </div>
                      <div
                        v-if="certificate.certType == 'fittings'"
                        class="row"
                      >
                        <div
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                            'text-break',
                          ]"
                        >
                          {{ arrayFormat(certificate.axesPosition[0]) + "" }}
                        </div>
                        <div
                          v-if="
                            certificate.axesPosition[1] ||
                              certificate.axesPosition.length > 1
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'text-break',
                            'border-start',
                          ]"
                        >
                          {{
                            arrayFormat(certificate.axesPosition[1]) + "" || ""
                          }}
                        </div>
                        <div
                          v-if="certificate.axesPosition[2]"
                          class="col-4 text-center border-start text-break"
                        >
                          {{
                            arrayFormat(certificate.axesPosition[2]) + "" || ""
                          }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">6.7.</th>
                    <td v-if="certificate.certType == 'sheetPipe'" class="w-50">
                      Термическая обработка
                    </td>
                    <td v-if="certificate.certType == 'fittings'" class="w-50">
                      Тип сварного соединения
                    </td>
                    <td class="w-50 border-bottom">
                      <div
                        v-if="certificate.certType == 'sheetPipe'"
                        class="row"
                      >
                        <div
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{ certificate.heatTreatment[0] }}
                        </div>
                        <div
                          v-if="
                            certificate.heatTreatment[1] ||
                              certificate.heatTreatment.length > 1
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{ certificate.heatTreatment[1] || "" }}
                        </div>
                        <div
                          v-if="certificate.heatTreatment[2]"
                          class="col-4 text-center border-start"
                        >
                          {{ certificate.heatTreatment[2] || "" }}
                        </div>
                      </div>
                      <div
                        v-if="certificate.certType == 'fittings'"
                        class="row"
                      >
                        <div
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                            'text-break',
                          ]"
                        >
                          {{ arrayFormat(certificate.weldedJoint[0]) + "" }}
                        </div>
                        <div
                          v-if="
                            certificate.weldedJoint[1] ||
                              certificate.weldedJoint.length > 1
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'text-break',
                            'border-start',
                          ]"
                        >
                          {{
                            arrayFormat(certificate.weldedJoint[1]) + "" || ""
                          }}
                        </div>
                        <div
                          v-if="certificate.weldedJoint[2]"
                          class="col-4 text-center border-start text-break"
                        >
                          {{
                            arrayFormat(certificate.weldedJoint[2]) + "" || ""
                          }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">7.</th>
                    <td class="w-50"><b>Материал образца:</b></td>
                    <td class="w-50"></td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">7.1.</th>
                    <td class="w-50">Марка и группа</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                            'overflow-auto',
                          ]"
                        >
                          {{ arrayFormat(certificate.brand[0]) + "" }}
                        </div>
                        <div
                          v-if="
                            certificate.brand[1] || certificate.brand.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                            'overflow-auto',
                          ]"
                        >
                          {{ arrayFormat(certificate.brand[1]) + "" || "" }}
                        </div>
                        <div
                          v-if="certificate.brand[2]"
                          class="col-4 text-center border-start overflow-auto"
                        >
                          {{ arrayFormat(certificate.brand[2]) + "" || "" }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">7.2.</th>
                    <td class="w-50">Толщина образца (мм)</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{ certificate.thickness[0] }}
                        </div>
                        <div
                          v-if="
                            certificate.thickness[1] ||
                              certificate.thickness.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{ certificate.thickness[1] || "" }}
                        </div>
                        <div
                          v-if="certificate.thickness[2]"
                          class="col-4 text-center border-start"
                        >
                          {{ certificate.thickness[2] || "" }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">7.3.</th>
                    <td v-if="certificate.certType == 'sheetPipe'" class="w-50">
                      Наружный диаметр трубы (мм)
                    </td>
                    <td v-if="certificate.certType == 'fittings'" class="w-50">
                      Диаметр стержня (мм)
                    </td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{ certificate.diameter[0] }}
                        </div>
                        <div
                          v-if="
                            certificate.diameter[1] ||
                              certificate.diameter.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{ certificate.diameter[1] || "" }}
                        </div>
                        <div
                          v-if="certificate.diameter[2]"
                          class="col-4 text-center border-start"
                        >
                          {{ certificate.diameter[2] || "" }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">8.</th>
                    <td class="w-50"><b>Сварочные материалы:</b></td>
                    <td class="w-50"></td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">8.1.</th>
                    <td class="w-50">Электрод или присадочная проволока</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                          ]"
                        >
                          {{ arrayFormat(certificate.electrode[0]) + "" }}
                        </div>
                        <div
                          v-if="
                            certificate.electrode[1] ||
                              certificate.electrode.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                          ]"
                        >
                          {{ arrayFormat(certificate.electrode[1]) + "" || "" }}
                        </div>
                        <div
                          v-if="certificate.electrode[2]"
                          class="col-4 text-center border-start"
                        >
                          {{ arrayFormat(certificate.electrode[2]) + "" || "" }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">8.2.</th>
                    <td class="w-50">Защитный газ и флюс</td>
                    <td class="w-50 border-bottom">
                      <div class="row">
                        <div
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            'text-center',
                            'overflow-auto',
                          ]"
                        >
                          {{ certificate.flux[0] }}
                        </div>
                        <div
                          v-if="
                            certificate.flux[1] || certificate.flux.length > 1
                          "
                          :class="[
                            { 'col-4': classCol_4 },
                            {
                              'col-6': classCol_6,
                            },

                            'text-center',
                            'border-start',
                            'overflow-auto',
                          ]"
                        >
                          {{ certificate.flux[1] || "" }}
                        </div>
                        <div
                          v-if="certificate.flux[2]"
                          class="col-4 text-center border-start overflow-auto"
                        >
                          {{ certificate.flux[2] || "" }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">9.</th>
                    <td class="w-50">
                      <b>Результаты контроля качества образца:</b>
                    </td>
                    <td class="w-50"></td>
                  </tr>

                  <tr class="d-flex">
                    <th scope="row">9.1.</th>
                    <td class="w-50">
                      {{ certificate.controls[0].type }}
                    </td>
                    <td class="w-50 ">
                      <div class="row px-2">
                        <div
                          v-for="(control, idx) in certificate.controls[0]
                            .values"
                          :key="idx"
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            {
                              'border-start': idx > 0,
                            },
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25">
                            {{ control ? control.grade : "" }}
                          </div>
                          <div class="border-bottom min-h-25">
                            {{
                              control
                                ? "Акт №" +
                                  control.num +
                                  " от " +
                                  dateFormat(control.date)
                                : ""
                            }}
                          </div>
                        </div>
                        <div
                          v-if="
                            certificate.controls[0].values.length < 3 &&
                              classCol_4
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },

                            'border-start',
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25"></div>
                          <div class="border-bottom min-h-25"></div>
                        </div>
                        <div
                          v-if="
                            certificate.controls[0].values.length < 2 &&
                              classCol_6
                          "
                          :class="[
                            {
                              'col-6': classCol_6,
                            },

                            'border-start',
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25"></div>
                          <div class="border-bottom min-h-25"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="certificate.controls.length > 1" class="d-flex">
                    <th scope="row">9.2.</th>
                    <td class="w-50">
                      {{ certificate.controls[1].type }}
                    </td>
                    <td class="w-50 ">
                      <div class="row px-2">
                        <div
                          v-for="(control, idx) in certificate.controls[1]
                            .values"
                          :key="idx"
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            {
                              'border-start': idx > 0,
                            },
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25">
                            {{ control ? control.grade : "" }}
                          </div>
                          <div class="border-bottom min-h-25">
                            {{
                              control
                                ? "Акт №" +
                                  control.num +
                                  " от " +
                                  dateFormat(control.date)
                                : ""
                            }}
                          </div>
                        </div>
                        <div
                          v-if="
                            certificate.controls[1].values.length < 3 &&
                              classCol_4
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },

                            'border-start',
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25"></div>
                          <div class="border-bottom min-h-25"></div>
                        </div>
                        <div
                          v-if="
                            certificate.controls[1].values.length < 2 &&
                              classCol_6
                          "
                          :class="[
                            {
                              'col-6': classCol_6,
                            },

                            'border-start',
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25"></div>
                          <div class="border-bottom min-h-25"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="certificate.controls.length > 2" class="d-flex">
                    <th scope="row">9.3.</th>
                    <td class="w-50">
                      {{ certificate.controls[2].type }}
                    </td>
                    <td class="w-50 ">
                      <div class="row px-2">
                        <div
                          v-for="(control, idx) in certificate.controls[2]
                            .values"
                          :key="idx"
                          :class="[
                            {
                              'col-4': classCol_4,
                            },
                            {
                              'col-6': classCol_6,
                            },
                            {
                              'col-12': classCol_12,
                            },
                            {
                              'border-start': idx > 0,
                            },
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25">
                            {{ control ? control.grade : "" }}
                          </div>
                          <div class="border-bottom min-h-25">
                            {{
                              control
                                ? "Акт №" +
                                  control.num +
                                  " от " +
                                  dateFormat(control.date)
                                : ""
                            }}
                          </div>
                        </div>
                        <div
                          v-if="
                            certificate.controls[2].values.length < 3 &&
                              classCol_4
                          "
                          :class="[
                            {
                              'col-4': classCol_4,
                            },

                            'border-start',
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25"></div>
                          <div class="border-bottom min-h-25"></div>
                        </div>
                        <div
                          v-if="
                            certificate.controls[2].values.length < 2 &&
                              classCol_6
                          "
                          :class="[
                            {
                              'col-6': classCol_6,
                            },

                            'border-start',
                            'text-center',
                            'overflow-auto',
                            'px-0',
                          ]"
                        >
                          <div class="border-bottom min-h-25"></div>
                          <div class="border-bottom min-h-25"></div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr class="d-flex">
                    <th scope="row">10.</th>
                    <td class="w-50">
                      Наименование НПА по нормам оценки качества
                    </td>
                    <td class="w-50 border-bottom text-center">
                      {{ certificate.npa + "" }}
                    </td>
                    <!-- <td class="w-100">
                      <p class="text-center border-bottom">
                        <span
                          class="w-50 d-block float-start text-start border-bottom border-white"
                          >Наименование НПА по нормам оценки качества</span
                        >
                        {{ certificate.npa + "" }}
                      </p>
                    </td> -->
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">11.</th>
                    <td class="w-50">Оценка теоретических знаний</td>
                    <td class="w-50 border-bottom text-center">
                      {{ certificate.grade }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">12.</th>
                    <td class="w-50">
                      <b>Решение аттестационной комиссии:</b>
                    </td>
                    <td class="w-50 border-bottom text-center overflow-auto">
                      {{ certificate.decision + " " }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row"></th>
                    <td class="w-100">
                      <div class="text-block">
                        <p>
                          Допущен к ручной дуговой сварке по следующим группам
                          технических устройств опасных производственных
                          объектов:
                        </p>

                        <div
                          v-for="(access, idx) in certificate.accesses"
                          :key="idx"
                        >
                          <p>
                            <b>{{ access.item }}:</b>
                          </p>
                          <p v-for="(value, idx) in access.values" :key="idx">
                            {{ value }}
                          </p>
                        </div>

                        <p class="fst-italic fw-bold my-3">
                          Сварщик допускается к сварке согласно области
                          распространения аттестации при наличии разряда,
                          указанного в руководящей и нормативно-технической
                          документации на сварку соответствующих конструкций
                        </p>
                        <h6 class="text-center fw-bold">
                          Сведения о сварке контрольных образцов и область
                          распространения аттестации
                        </h6>
                        <table class="table-main w-100 mb-1">
                          <thead>
                            <tr>
                              <td class="border w-50 px-2">
                                Параметры сварки
                              </td>
                              <td class="border w-50 px-2 text-center">
                                Область распространения аттестации
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="border w-50 px-2">
                                Группа технических устройств
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(
                                    shortingTableItems(certificate.accesses)
                                  ) + ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">Способ сварки</td>
                              <td class="border w-50 px-2 text-center">
                                {{ certificate.weldingMethodScope }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Вид свариваемых деталей
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(certificate.weldedTypeScope) + ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">Вид шва</td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(certificate.weldedSeamScope) + ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Группа материалов
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{ arrayFormat(certificate.brandScope) + "" }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Тип присадочного металла
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(certificate.electrodeScope) + ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Защитный газ (флюс)
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{ certificate.fluxScope }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Вспомогательные материалы
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{ certificate.auxiliaryScope }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Толщина образца, мм
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{ certificate.thicknessScope }}
                              </td>
                            </tr>
                            <tr>
                              <td
                                v-if="certificate.certType == 'sheetPipe'"
                                class="border w-50 px-2"
                              >
                                Наружный диаметр трубы, мм
                              </td>
                              <td
                                v-if="certificate.certType == 'fittings'"
                                class="border w-50 px-2"
                              >
                                Диаметр стержня, мм
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{ certificate.diameterScope }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Положение при сварке
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(certificate.weldedPositionScope) +
                                    ""
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td class="border w-50 px-2">
                                Исполнение сварного шва
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(
                                    certificate.weldedConnectionScope
                                  ) + ""
                                }}
                              </td>
                            </tr>
                            <tr v-if="certificate.certType == 'fittings'">
                              <td class="border w-50 px-2">
                                Положение осей стержней
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(certificate.axesPositionScope) +
                                    ""
                                }}
                              </td>
                            </tr>
                            <tr v-if="certificate.certType == 'fittings'">
                              <td class="border w-50 px-2">
                                Тип сварного соединения
                              </td>
                              <td class="border w-50 px-2 text-center">
                                {{
                                  arrayFormat(certificate.weldedJointScope) + ""
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <th scope="row">13.</th>
                    <td class="w-50">Срок периодической аттестации</td>
                    <td class="w-50 border-bottom text-center">
                      {{ dateFormat(certificate.expiration) }} г.
                      <p class="text-danger no-print" v-if="expired">
                        не действует
                      </p>
                    </td>
                  </tr>

                  <tr class="d-flex no-print">
                    <td>
                      Аттестационная комиссия:
                      {{ arrayFormat(certificate.comission) + "" }}
                    </td>
                  </tr>
                  <!-- <tr class="d-flex print">
                    <td class="d-flex pt-3">
                      <div class="me-2">Аттестационная комиссия:</div>

                      <ul class="list-unstyled">
                        <li
                          v-for="member in certificate.comission"
                          :key="member"
                          class="mb-4"
                        >
                          <span class="signature"><sub>(подпись)</sub></span>
                          {{ member }}
                        </li>
                      </ul>
                    </td>
                  </tr> -->
                </table>
              </div>

              <div class="d-flex justify-content-between mt-2">
                <certificate-qr
                  :data="[
                    certificate.firstname,
                    certificate.secondname,
                    certificate.lastname,
                    certificate.numCertificate,
                    dateFormat(certificate.date),
                    $route.params.id,
                  ]"
                ></certificate-qr>

                <div class="d-flex print">
                  <div class="d-flex pt-3">
                    <div class="me-2">Аттестационная комиссия:</div>

                    <ul class="list-unstyled">
                      <li
                        v-for="member in certificate.comission"
                        :key="member"
                        class="mb-4"
                      >
                        <span class="signature"><sub>(подпись)</sub></span>
                        {{ member }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                class="certificate-nav text-center font-family-default d-flex justify-content-center"
              >
                <button
                  class="btn btn-cert-control btn-cert-control-warning rounded-circle mx-3"
                  type="button"
                  title="Редактировать"
                  @click="showEditFields = true"
                  v-if="access"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </span>
                </button>
                <router-link
                  v-slot="{ navigate }"
                  :to="{
                    name: 'Add Certificate',
                    params: {
                      id: certificateData._id,
                      firstname: certificateData.firstname,
                      secondname: certificateData.secondname,
                      lastname: certificateData.lastname,
                      birthday: certificateData.birthday,
                      passport: certificateData.passport,
                      work: certificateData.work,
                      workYears: certificateData.workYears,
                      qualifyingRank: certificateData.qualifyingRank,
                      numCertificate: certificateData.numCertificate,
                      date: certificateData.date,
                    },
                  }"
                  v-if="access"
                >
                  <button
                    class="btn btn-cert-control btn-cert-control-success rounded-circle mx-3"
                    type="button"
                    title="Добавить вкладыш"
                    @click="navigate"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-files"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"
                        />
                      </svg>
                    </span>
                  </button>
                </router-link>
                <button
                  class="btn btn-cert-control btn-cert-control-danger rounded-circle mx-3"
                  type="button"
                  title="Удалить"
                  @click="showModal"
                  v-if="access"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                      />
                    </svg>
                  </span>
                </button>
                <button
                  class="btn btn-cert-control btn-cert-control-primary rounded-circle mx-3"
                  type="button"
                  title="Печать"
                  @click="print"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-printer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                      <path
                        d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"
                      />
                    </svg>
                  </span>
                </button>
                <button
                  class="btn btn-cert-control btn-cert-control-primary rounded-circle mx-3"
                  type="button"
                  title="Сохранить в формате PDF"
                  @click="exportToPDF"
                  v-if="access"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-file-pdf"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                      />
                      <path
                        d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"
                      />
                    </svg>
                  </span>
                </button>
                <button
                  class="btn btn-cert-control btn-cert-control-primary rounded-circle mx-3"
                  type="button"
                  title="Сохранить в формате MS Word"
                  @click="exportToWord"
                  v-if="access"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-file-word"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4.879 4.515a.5.5 0 0 1 .606.364l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 0 1 .364-.606z"
                      />
                      <path
                        d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="showEditFields" class="py-4">
        <h4 class="text-center mb-4">
          Редактировать Удостоверение №{{ certificate.numCertificate }}
        </h4>
        <div class="edit-certificate">
          <new-certificate-form
            :certValues="certificate"
            :certSubmit="'edit'"
            @hide="showEditFields = false"
            @update="loadingData"
          ></new-certificate-form>
        </div>
      </div>
      <div v-else-if="!isId" class="py-4">
        <h5 class="text-center">
          Удостоверение с ID {{ $route.params.id }} не найдено
        </h5>
        <p class="text-center">
          <router-link to="/">Вернуться на главную</router-link>
        </p>
      </div>
    </div>

    <div v-else class="container">
      <app-loader v-if="loading"></app-loader>

      <div v-else-if="certificate && isId" class="py-4">
        <div class="row">
          <h4 class="text-center mb-0">
            Удостоверение №{{ certificate.numCertificate }}
          </h4>

          <div class="my-4">
            <p class="mb-sm-2 mb-md-0 mb-lg-0 mb-xl-0">
              <span class="check-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              Удостоверение действительно до
              {{ dateFormat(certificate.expiration) }}
              <span class="text-danger d-block" v-if="expired"
                >не действует</span
              >
            </p>
            <p class="mb-sm-2 mb-md-0 mb-lg-0 mb-xl-0">
              В реестр "Университетские технологии" внесено
            </p>
            <p class="mb-sm-2 mb-md-0 mb-lg-0 mb-xl-0">
              {{
                certificate.firstname +
                  " " +
                  certificate.secondname +
                  " " +
                  certificate.lastname
              }}
            </p>
            <p class="mb-sm-2 mb-md-0 mb-lg-0 mb-xl-0">
              {{ certificate.work }}
            </p>
            <p class="mb-sm-2 mb-md-0 mb-lg-0 mb-xl-0">
              {{ shortingTableItems(certificate.accesses) + "" }}
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="!isId" class="py-4">
        <h5 class="text-center">
          Удостоверение с ID {{ $route.params.id }} не найдено
        </h5>
      </div>
    </div>

    <teleport to="body">
      <app-modal
        v-if="modal"
        title="Удалить запись из реестра?"
        @close="closeModal"
      >
        <div class="modal-body">
          Запись протокола удостоверения №{{ certificate.numCertificate }}
          <b>{{
            certs == 0 && certificateSubData.length
              ? "со всеми вкладышами"
              : certs !== 0 && certificateSubData.length
              ? "(вкладыш)"
              : ""
          }}</b>
          будет удалена из реестра. Вы подтверждаете удаление?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="removeCertificate($route.params.id)"
          >
            Да
          </button>
          <button type="button" class="btn btn-danger" @click="closeModal">
            Нет
          </button>
        </div>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, onMounted, computed, watch } from "vue";
// import { Tooltip } from "bootstrap";
import { dateFormat } from "../utils/dateFormat";
import { protocolDateFormat } from "../utils/protocolDateFormat";
import { shortingTableItems } from "../utils/shortingTableItems";
import { arrayFormat } from "../utils/arrayFormat";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import * as ImageModule from "docxtemplater-image-module-free/build/imagemodule";
import * as html2pdf from "html2pdf.js";
import AppPage from "../components/ui/AppPage.vue";
import AppModal from "../components/AppModal";
import AppLoader from "../components/ui/AppLoader.vue";
import NewCertificateForm from "../components/certificates/NewCertificateForm.vue";
import CertificateQr from "../components/certificates/CertificateQr.vue";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

// new Tooltip(document.body, {
//   selector: "[data-bs-toggle='tooltip']",
//   trigger: "hover",
// });

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    const modal = ref(false);
    const certificateData = ref({});
    const certificateSubData = ref([]);
    const certificate = ref();
    const auth = store.getters["auth/isAuthenticated"];
    const userRole = store.getters["auth/user"].roles;
    const access = ref(false);
    const showEditFields = ref(false);
    const isId = ref(true);

    //срок действия удостоверения окончен
    const expired = ref(false);

    //Переключатель удостоверений и вкладышей
    const certs = ref(0);

    onMounted(() => {
      loadingData();

      // console.log("classCol_6:", classCol_6.value);
    });

    const classCol_4 = computed(() => {
      let mainBool =
        certificate.value.stigma.length == 3 ||
        certificate.value.weldingMethod.length == 3 ||
        certificate.value.weldedType.length == 3 ||
        certificate.value.weldedPosition.length == 3 ||
        certificate.value.brand.length == 3 ||
        certificate.value.thickness.length == 3 ||
        certificate.value.diameter.length == 3 ||
        certificate.value.electrode.length == 3 ||
        certificate.value.flux.length == 3 ||
        (certificate.value.weldedConnection.length == 3 &&
          certificate.value.weldedSeam.length == 3);
      let variableBool;
      let controlsBool;

      if (certificate.value.certType == "sheetPipe") {
        variableBool =
          certificate.value.preheating.length == 3 ||
          certificate.value.heatTreatment.length == 3;
      } else if (certificate.value.certType == "fittings") {
        variableBool =
          certificate.value.axesPosition.length == 3 ||
          certificate.value.weldedJoint.length == 3;
      }

      if (certificate.value.controls[0]) {
        controlsBool = certificate.value.controls[0].values.length == 3;
      }
      if (certificate.value.controls[1]) {
        controlsBool =
          certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls[1].values.length == 3;
      }
      if (certificate.value.controls[2]) {
        controlsBool =
          certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls[1].values.length == 3 &&
          certificate.value.controls[2].values.length == 3;
      }

      return mainBool || variableBool || controlsBool;
    });

    const classCol_6 = computed(() => {
      let mainBoolAND =
        certificate.value.stigma.length < 3 &&
        certificate.value.weldingMethod.length < 3 &&
        certificate.value.weldedType.length < 3 &&
        certificate.value.weldedConnection.length < 3 &&
        certificate.value.weldedSeam.length < 3 &&
        certificate.value.weldedPosition.length < 3 &&
        certificate.value.brand.length < 3 &&
        certificate.value.thickness.length < 3 &&
        certificate.value.diameter.length < 3 &&
        certificate.value.electrode.length < 3 &&
        certificate.value.flux.length < 3;

      let mainBoolOR =
        certificate.value.stigma.length > 1 ||
        certificate.value.weldingMethod.length > 1 ||
        certificate.value.weldedType.length > 1 ||
        certificate.value.weldedPosition.length > 1 ||
        certificate.value.brand.length > 1 ||
        certificate.value.thickness.length > 1 ||
        certificate.value.diameter.length > 1 ||
        certificate.value.electrode.length > 1 ||
        certificate.value.flux.length > 1 ||
        (certificate.value.weldedConnection.length > 1 &&
          certificate.value.weldedSeam.length > 1);

      let variableBoolAND;
      let variableBoolOR;
      let controlsBoolAND;
      let controlsBoolOR;

      if (certificate.value.certType == "sheetPipe") {
        variableBoolAND =
          certificate.value.preheating.length < 3 &&
          certificate.value.heatTreatment.length < 3;
        variableBoolOR =
          certificate.value.preheating.length > 1 ||
          certificate.value.heatTreatment.length > 1;
      } else if (certificate.value.certType == "fittings") {
        variableBoolAND =
          certificate.value.axesPosition.length < 3 &&
          certificate.value.weldedJoint.length < 3;
        variableBoolOR =
          certificate.value.axesPosition.length > 1 ||
          certificate.value.weldedJoint.length > 1;
      }

      if (certificate.value.controls[0]) {
        controlsBoolAND = certificate.value.controls[0].values.length < 3;
        controlsBoolOR = certificate.value.controls[0].values.length > 1;
      }
      if (certificate.value.controls[1]) {
        controlsBoolAND =
          certificate.value.controls[0].values.length < 3 &&
          certificate.value.controls[1].values.length < 3;
        controlsBoolOR =
          certificate.value.controls[0].values.length > 1 ||
          certificate.value.controls[1].values.length > 1;
      }
      if (certificate.value.controls[2]) {
        controlsBoolAND =
          certificate.value.controls[0].values.length < 3 &&
          certificate.value.controls[1].values.length < 3 &&
          certificate.value.controls[2].values.length < 3;
        controlsBoolOR =
          certificate.value.controls[0].values.length > 1 ||
          certificate.value.controls[1].values.length > 1 ||
          certificate.value.controls[2].values.length > 1;
      }

      // return mainBool && variableBool && controlsBool;

      return (
        mainBoolAND &&
        controlsBoolAND &&
        variableBoolAND &&
        (mainBoolOR || variableBoolOR || controlsBoolOR)
      );
    });

    const classCol_12 = computed(() => {
      let mainBool =
        certificate.value.stigma.length == 1 &&
        certificate.value.weldingMethod.length == 1 &&
        certificate.value.weldedType.length == 1 &&
        certificate.value.weldedConnection.length == 1 &&
        certificate.value.weldedSeam.length == 1 &&
        certificate.value.weldedPosition.length == 1 &&
        certificate.value.brand.length == 1 &&
        certificate.value.thickness.length == 1 &&
        certificate.value.diameter.length == 1 &&
        certificate.value.electrode.length == 1 &&
        certificate.value.flux.length == 1;
      let variableBool;
      let controlsBool;

      if (certificate.value.certType == "sheetPipe") {
        variableBool =
          certificate.value.preheating.length == 1 &&
          certificate.value.heatTreatment.length == 1;
      } else if (certificate.value.certType == "fittings") {
        variableBool =
          certificate.value.axesPosition.length == 1 &&
          certificate.value.weldedJoint.length == 1;
      }

      if (certificate.value.controls[0]) {
        controlsBool = certificate.value.controls[0].values.length == 1;
      }
      if (certificate.value.controls[1]) {
        controlsBool =
          certificate.value.controls[0].values.length == 1 &&
          certificate.value.controls[1].values.length == 1;
      }
      if (certificate.value.controls[2]) {
        controlsBool =
          certificate.value.controls[0].values.length == 1 &&
          certificate.value.controls[1].values.length == 1 &&
          certificate.value.controls[2].values.length == 1;
      }

      return mainBool && variableBool && controlsBool;
    });

    const loadingData = async () => {
      try {
        loading.value = true;

        if (userRole) {
          userRole.includes("admin") || userRole.includes("god")
            ? (access.value = true)
            : (access.value = false);
        }

        certificateData.value = await store.dispatch(
          "certificate/loadById",
          route.params.id
        );
        certificateSubData.value = await store.dispatch(
          "certificateSub/loadOwner",
          route.params.id
        );

        certificate.value = certificateData.value;

        //сбросить переключатель вкладышей
        certs.value = 0;

        // certificate.value = certificateData.value;

        // console.log("certificateData", certificateData);
        //console.log("certificate", certificate.value);
        // console.log("certificateSub", certificateSubData);
        //console.log("classCol_4:", classCol_4.value);
        //console.log("classCol_6:", classCol_6.value);
        // console.log("classCol_12:", classCol_12.value);

        //проверка срока действия удостоверения
        new Date(certificate.value.expiration) < new Date()
          ? (expired.value = true)
          : (expired.value = false);

        // console.log("certificate::: ", certificate.value);

        loading.value = false;
      } catch (error) {
        isId.value = false;
        loading.value = false;
      }
    };

    watch(certs, (val, prevVal) => {
      if (val == 0) {
        certificate.value = certificateData.value;
      } else {
        certificate.value = certificateSubData.value[val - 1];
      }
    });

    const removeCertificate = async (id) => {
      try {
        if (certificate.value.owner) {
          //удалить вкладыш
          await store.dispatch("certificateSub/remove", certificate.value._id);
          modal.value = false;

          //обновление данных удостоверения
          loadingData();
        } else {
          //проверить, есть ли у удаляемого удостоверерния вкладыши
          const certSubToRemove = await store.dispatch(
            "certificateSub/loadOwner",
            id
          );
          // console.log("certSubToRemove : ", certSubToRemove);
          //если есть вкладыши, то удалить их
          if (certSubToRemove.length) {
            certSubToRemove.forEach(async (item) => {
              await store.dispatch("certificateSub/remove", item._id);
            });
          }

          //удалить удостоверение
          await store.dispatch("certificate/remove", id);
          modal.value = false;
          router.push("/");
        }
      } catch (e) {
        // console.log(e);
      }

      // certificate.value = await store.dispatch("certificate/remove", id);
    };

    function showModal() {
      modal.value = true;
      setTimeout(() => {
        let systemModal = document.getElementById("systemModal");
        systemModal.classList.add("show");
      }, 0);
    }

    function closeModal() {
      modal.value = false;
    }

    const print = () => {
      window.print();
    };

    const exportToPDF = async () => {
      let content = document.getElementById("exportContent");
      content.classList.add("export-pdf");

      let element = document.getElementById("exportContent");

      let opt = {
        margin: [0.4, 0.5, 0.4, 0.5],
        filename: `${certificate.value.numCertificate}.pdf`,
        image: { type: "jpeg", quality: 1 },
        pagebreak: { mode: ["avoid-all", "css"] },
        html2canvas: { scale: 5 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      loading.value = true;

      // New Promise-based usage:
      await html2pdf()
        .set(opt)
        .from(element)
        .save();

      // html2pdf(element);

      content.classList.remove("export-pdf");

      loading.value = false;
    };

    const exportToWord = () => {
      let templateFile = "";
      let col2 =
        certificate.value.stigma.length == 2 &&
        certificate.value.weldingMethod == 2 &&
        certificate.value.weldedType == 2 &&
        certificate.value.weldedSeam == 2 &&
        certificate.value.weldedConnection == 2 &&
        certificate.value.weldedPosition == 2 &&
        certificate.value.brand == 2 &&
        certificate.value.thickness == 2 &&
        certificate.value.diameter == 2 &&
        certificate.value.electrode == 2 &&
        certificate.value.flux == 2;
      let col3 =
        certificate.value.stigma.length == 3 ||
        certificate.value.weldingMethod == 3 ||
        certificate.value.weldedType == 3 ||
        certificate.value.weldedSeam == 3 ||
        certificate.value.weldedConnection == 3 ||
        certificate.value.weldedPosition == 3 ||
        certificate.value.brand == 3 ||
        certificate.value.thickness == 3 ||
        certificate.value.diameter == 3 ||
        certificate.value.electrode == 3 ||
        certificate.value.flux == 3;

      if (
        certificate.value.controls[0].values.length == 1 &&
        certificate.value.controls.length == 1 &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col1-controls1.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 2 &&
          certificate.value.controls.length == 1) ||
          col2) &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col2-controls1.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls.length == 1) ||
          col3) &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col3-controls1.docx";
      } else if (
        certificate.value.controls[0].values.length == 1 &&
        certificate.value.controls.length == 2 &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col1-controls2.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 2 &&
          certificate.value.controls.length == 2) ||
          col2) &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col2-controls2.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls.length == 2) ||
          col3) &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col3-controls2.docx";
      } else if (
        certificate.value.controls[0].values.length == 1 &&
        certificate.value.controls.length == 3 &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col1-controls3.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 2 &&
          certificate.value.controls.length == 3) ||
          col2) &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col2-controls3.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls.length == 3) ||
          col3) &&
        !certificate.value.numOldCert
      ) {
        templateFile = "/temp-col3-controls3.docx";
      } else if (
        certificate.value.controls[0].values.length == 1 &&
        certificate.value.controls.length == 1 &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col1-controls1v.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 2 &&
          certificate.value.controls.length == 1) ||
          col2) &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col2-controls1v.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls.length == 1) ||
          col3) &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col3-controls1v.docx";
      } else if (
        certificate.value.controls[0].values.length == 1 &&
        certificate.value.controls.length == 2 &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col1-controls2v.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 2 &&
          certificate.value.controls.length == 2) ||
          col2) &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col2-controls2v.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls.length == 2) ||
          col3) &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col3-controls2v.docx";
      } else if (
        certificate.value.controls[0].values.length == 1 &&
        certificate.value.controls.length == 3 &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col1-controls3v.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 2 &&
          certificate.value.controls.length == 3) ||
          col2) &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col2-controls3v.docx";
      } else if (
        ((certificate.value.controls[0].values.length == 3 &&
          certificate.value.controls.length == 3) ||
          col3) &&
        certificate.value.numOldCert
      ) {
        templateFile = "/temp-col3-controls3v.docx";
      }

      let variableTitle1,
        variableTitle2,
        variableTitle3,
        variableTitle4,
        variableTitle5,
        variableString1Val1,
        variableString1Val2,
        variableString1Val3,
        variableString2Val1,
        variableString2Val2,
        variableString2Val3,
        variableString3Val,
        variableString4Val = "";

      if (certificate.value.certType == "sheetPipe") {
        variableTitle1 = "Предварительный и сопутствующий подогрев";
        variableTitle2 = "Термическая обработка";
        variableTitle3 = "Наружный диаметр трубы, мм";
        variableTitle4 = "Положение при сварке";
        variableTitle5 = "Исполнение сварного шва";
        variableString1Val1 = certificate.value.preheating[0];
        variableString1Val2 = certificate.value.preheating[1];
        variableString1Val3 = certificate.value.preheating[2];
        variableString2Val1 = certificate.value.heatTreatment[0];
        variableString2Val2 = certificate.value.heatTreatment[1];
        variableString2Val3 = certificate.value.heatTreatment[2];
        variableString3Val =
          arrayFormat(certificate.value.weldedPositionScope) + "";
        variableString4Val =
          arrayFormat(certificate.value.weldedConnectionScope) + "";
      } else if (certificate.value.certType == "fittings") {
        variableTitle1 = "Положение осей стержней";
        variableTitle2 = "Тип сварного соединения";
        variableTitle3 = "Диаметр стержня, мм";
        variableTitle4 = "Положение осей стержней";
        variableTitle5 = "Тип сварного соединения";
        variableString1Val1 =
          arrayFormat(certificate.value.axesPosition[0]) + "";
        variableString1Val2 =
          arrayFormat(certificate.value.axesPosition[1]) + "";
        variableString1Val3 =
          arrayFormat(certificate.value.axesPosition[2]) + "";
        variableString2Val1 =
          arrayFormat(certificate.value.weldedJoint[0]) + "";
        variableString2Val2 =
          arrayFormat(certificate.value.weldedJoint[1]) + "";
        variableString2Val3 =
          arrayFormat(certificate.value.weldedJoint[2]) + "";
        variableString3Val =
          arrayFormat(certificate.value.axesPositionScope) + "";
        variableString4Val =
          arrayFormat(certificate.value.weldedJointScope) + "";
      }

      loadFile(templateFile, function(error, content) {
        if (error) {
          // console.log("ERROR");
          throw error;
        }
        const zip = new PizZip(content);

        const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
        function base64Parser(dataURL) {
          if (typeof dataURL !== "string" || !base64Regex.test(dataURL)) {
            return false;
          }
          const stringBase64 = dataURL.replace(base64Regex, "");

          // For browsers :
          const binaryString = window.atob(stringBase64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          return bytes.buffer;
        }

        const imageOpts = {
          centered: false,
          getImage: function(tagValue, tagName) {
            const canvas = document.getElementsByTagName("canvas")[0];
            const ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, 2 * Math.PI);
            ctx.stroke();
            return base64Parser(canvas.toDataURL());
          },
          getSize: function(img, tagValue, tagName) {
            // FOR FIXED SIZE IMAGE :
            return [150, 150];

            // FOR IMAGE COMING FROM A URL (IF TAGVALUE IS AN ADDRESS) :
            // To use this feature, you have to be using docxtemplater async
            // (if you are calling render(), you are not using async).
            return new Promise(function(resolve, reject) {
              const image = new Image();
              image.src = url;
              image.onload = function() {
                resolve([image.width, image.height]);
              };
              image.onerror = function(e) {
                console.log(
                  "img, tagValue, tagName : ",
                  img,
                  tagValue,
                  tagName
                );
                alert("An error occured while loading " + tagValue);
                reject(e);
              };
            });
          },
        };

        const doc = new Docxtemplater(zip, {
          modules: [new ImageModule(imageOpts)],
          paragraphLoop: true,
          linebreaks: true,
        });
        doc.setData({
          date: protocolDateFormat(certificate.value.date),
          numProtocol: certificate.value.numProtocol,
          textHead: certificate.value.textHead,
          firstname: certificate.value.firstname,
          secondname: certificate.value.secondname,
          lastname: certificate.value.lastname,
          birthday: dateFormat(certificate.value.birthday),
          passport: certificate.value.passport,
          work: certificate.value.work,
          workYears: certificate.value.workYears,
          qualifyingRank: certificate.value.qualifyingRank,
          numOldCert: certificate.value.numOldCert,
          dateOldCert: dateFormat(certificate.value.dateOldCert),
          attestationType: certificate.value.attestationType,
          stigma1: certificate.value.stigma[0],
          stigma2: certificate.value.stigma[1]
            ? certificate.value.stigma[1]
            : "",
          stigma3: certificate.value.stigma[2]
            ? certificate.value.stigma[2]
            : "",
          weldingMethod1: certificate.value.weldingMethod[0],
          weldingMethod2: certificate.value.weldingMethod[1]
            ? certificate.value.weldingMethod[1]
            : "",
          weldingMethod3: certificate.value.weldingMethod[2]
            ? certificate.value.weldingMethod[2]
            : "",
          weldedType1: certificate.value.weldedType[0],
          weldedType2: certificate.value.weldedType[1]
            ? certificate.value.weldedType[1]
            : "",
          weldedType3: certificate.value.weldedType[2]
            ? certificate.value.weldedType[2]
            : "",
          weldedSeamConnection1:
            arrayFormat(certificate.value.weldedSeam[0]) +
            ", " +
            arrayFormat(certificate.value.weldedConnection[0]),
          weldedSeamConnection2:
            arrayFormat(certificate.value.weldedSeam[1]) +
            (certificate.value.weldedSeam[1] &&
            certificate.value.weldedConnection[1]
              ? ", "
              : "") +
            arrayFormat(certificate.value.weldedConnection[1]),
          weldedSeamConnection3:
            arrayFormat(certificate.value.weldedSeam[2]) +
            (certificate.value.weldedSeam[2] &&
            certificate.value.weldedConnection[2]
              ? ", "
              : "") +
            arrayFormat(certificate.value.weldedConnection[2]),
          weldedPosition1: arrayFormat(certificate.value.weldedPosition[0]),
          weldedPosition2: arrayFormat(certificate.value.weldedPosition[1]),
          weldedPosition3: arrayFormat(certificate.value.weldedPosition[2]),
          variableTitle1: variableTitle1,
          variableTitle2: variableTitle2,
          variableTitle3: variableTitle3,
          variableTitle4: variableTitle4,
          variableTitle5: variableTitle5,
          variableString1Val1: variableString1Val1,
          variableString1Val2: variableString1Val2,
          variableString1Val3: variableString1Val3,
          variableString2Val1: variableString2Val1,
          variableString2Val2: variableString2Val2,
          variableString2Val3: variableString2Val3,
          variableString3Val: variableString3Val,
          variableString4Val: variableString4Val,
          brand1: certificate.value.brand[0],
          brand2: certificate.value.brand[1] ? certificate.value.brand[1] : "",
          brand3: certificate.value.brand[2] ? certificate.value.brand[2] : "",
          thickness1: certificate.value.thickness[0],
          thickness2: certificate.value.thickness[1],
          thickness3: certificate.value.thickness[2],
          diameter1: certificate.value.diameter[0],
          diameter2: certificate.value.diameter[1],
          diameter3: certificate.value.diameter[2],
          electrode1: arrayFormat(certificate.value.electrode[0]) + "",
          electrode2: arrayFormat(certificate.value.electrode[1]) + "",
          electrode3: arrayFormat(certificate.value.electrode[2]) + "",
          flux1: certificate.value.flux[0],
          flux2: certificate.value.flux[1],
          flux3: certificate.value.flux[2],
          controls1Type: certificate.value.controls[0].type,
          controls1Grade1: certificate.value.controls[0].values[0].grade,
          controls1Num1: certificate.value.controls[0].values[0].num,
          controls1Date1: dateFormat(
            certificate.value.controls[0].values[0].date
          ),
          controls1Grade2: certificate.value.controls[0].values[1]
            ? certificate.value.controls[0].values[1].grade
            : "",
          controls1Num2: certificate.value.controls[0].values[1]
            ? certificate.value.controls[0].values[1].num
            : "",
          controls1Date2: certificate.value.controls[0].values[1]
            ? dateFormat(certificate.value.controls[0].values[1].date)
            : "",
          controls1Grade3: certificate.value.controls[0].values[2]
            ? certificate.value.controls[0].values[2].grade
            : "",
          controls1Num3: certificate.value.controls[0].values[2]
            ? certificate.value.controls[0].values[2].num
            : "",
          controls1Date3: certificate.value.controls[0].values[2]
            ? dateFormat(certificate.value.controls[0].values[2].date)
            : "",
          controls2Type: certificate.value.controls[1]
            ? certificate.value.controls[1].type
            : "",
          controls2Grade1:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[0]
              ? certificate.value.controls[1].values[0].grade
              : "",
          controls2Num1:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[0]
              ? certificate.value.controls[1].values[0].num
              : "",
          controls2Date1:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[0]
              ? dateFormat(certificate.value.controls[1].values[0].date)
              : "",
          controls2Grade2:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[1]
              ? certificate.value.controls[1].values[1].grade
              : "",
          controls2Num2:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[1]
              ? certificate.value.controls[1].values[1].num
              : "",
          controls2Date2:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[1]
              ? dateFormat(certificate.value.controls[1].values[1].date)
              : "",
          controls2Grade3:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[2]
              ? certificate.value.controls[1].values[2].grade
              : "",
          controls2Num3:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[2]
              ? certificate.value.controls[1].values[2].num
              : "",
          controls2Date3:
            certificate.value.controls[1] &&
            certificate.value.controls[1].values[2]
              ? dateFormat(certificate.value.controls[1].values[2].date)
              : "",
          controls3Type: certificate.value.controls[2]
            ? certificate.value.controls[2].type
            : "",
          controls3Grade1: certificate.value.controls[2]
            ? certificate.value.controls[2].values[0].grade
            : "",
          controls3Num1: certificate.value.controls[2]
            ? certificate.value.controls[2].values[0].num
            : "",
          controls3Date1: certificate.value.controls[2]
            ? dateFormat(certificate.value.controls[2].values[0].date)
            : "",
          controls3Grade2: certificate.value.controls[2]
            ? certificate.value.controls[2].values[1].grade
            : "",
          controls3Num2: certificate.value.controls[2]
            ? certificate.value.controls[2].values[1].num
            : "",
          controls3Date2: certificate.value.controls[2]
            ? dateFormat(certificate.value.controls[2].values[1].date)
            : "",
          controls3Grade3: certificate.value.controls[2]
            ? certificate.value.controls[2].values[2].grade
            : "",
          controls3Num3: certificate.value.controls[2]
            ? certificate.value.controls[2].values[2].num
            : "",
          controls3Date3: certificate.value.controls[2]
            ? dateFormat(certificate.value.controls[2].values[2].date)
            : "",
          npa: certificate.value.npa + "",
          grade: certificate.value.grade,
          decision: certificate.value.decision + "",
          accesses: certificate.value.accesses,
          accessesShortingTable:
            arrayFormat(shortingTableItems(certificate.value.accesses)) + "",
          weldingMethodScope: certificate.value.weldingMethodScope,
          weldedTypeScope: arrayFormat(certificate.value.weldedTypeScope) + "",
          weldedSeamScope: arrayFormat(certificate.value.weldedSeamScope) + "",
          brandScope: arrayFormat(certificate.value.brandScope) + "",
          electrodeScope: arrayFormat(certificate.value.electrodeScope) + "",
          fluxScope: certificate.value.fluxScope,
          auxiliaryScope: certificate.value.auxiliaryScope,
          thicknessScope: certificate.value.thicknessScope,
          diameterScope: certificate.value.diameterScope,
          expiration: dateFormat(certificate.value.expiration),
          myImage: "sampleImage.png",
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function(
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function(error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Output the document using Data-URI
        saveAs(out, certificate.value.numCertificate + ".docx");
      });
    };

    return {
      loading,
      isId,
      showModal,
      closeModal,
      certificate,
      certificateData,
      certificateSubData,
      dateFormat,
      protocolDateFormat,
      shortingTableItems,
      arrayFormat,
      removeCertificate,
      print,
      exportToPDF,
      exportToWord,

      auth,
      access,
      modal,
      showEditFields,
      loadingData,
      expired,
      certs,

      classCol_4,
      classCol_6,
      classCol_12,
    };
  },
  components: {
    AppPage,
    AppLoader,
    AppModal,
    NewCertificateForm,
    CertificateQr,
  },
};
</script>

<style scoped></style>
