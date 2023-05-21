import axios from "../../axios/request";
import $api from "../../axios/request";
import store from "../index";

export default {
  namespaced: true,
  state() {
    return {
      certTextHeads: [],
      certQualifyingRanks: [],
      certAttestationTypes: [],
      certWeldingMethods: [],
      certWeldedTypes: [],
      certWeldedSeams: [],
      certWeldedConnections: [],
      certWeldedPositions: [],
      certAxesPositions: [],
      certWeldedJoints: [],
      certBrands: [],
      certElectrodes: [],
      certComissions: [],
      certControls: [],
      certVisuals: [],
      certUltrasonicTestings: [],
      certGrades: [],
      certAccesses: [],
      certAccessItems: [],
      system: [],
    };
  },
  mutations: {
    //обновление в хранилище setCertQualifyingRanks[]
    setCertQualifyingRanks(state, certQualifyingRanks) {
      state.certQualifyingRanks = certQualifyingRanks;
      // console.log("MUTATION:Set from state: ", state.certQualifyingRanks);
    },
    //добавление новых значений в хранилище setCertQualifyingRanks[]
    addCertQualifyingRank(state, certQualifyingRank) {
      state.certQualifyingRanks.push(certQualifyingRank);
      // console.log("MUTATION:Add to state: ", state.certQualifyingRanks);
    },
    //обновление в хранилище []
    setCertAttestationTypes(state, certAttestationTypes) {
      state.certAttestationTypes = certAttestationTypes;
    },
    //добавление новых значений в хранилище []
    addCertAttestationType(state, certAttestationType) {
      state.certAttestationTypes.push(certAttestationType);
    },

    //обновление в хранилище []
    setCertWeldingMethods(state, certWeldingMethods) {
      state.certWeldingMethods = certWeldingMethods;
    },
    //добавление новых значений в хранилище []
    addCertWeldingMethod(state, certWeldingMethod) {
      state.certWeldingMethods.push(certWeldingMethod);
    },

    //обновление в хранилище []
    setCertWeldedTypes(state, certWeldedTypes) {
      state.certWeldedTypes = certWeldedTypes;
    },
    //добавление новых значений в хранилище []
    addCertWeldedType(state, certWeldedType) {
      state.certWeldedTypes.push(certWeldedType);
    },

    //обновление в хранилище []
    setCertWeldedSeams(state, certWeldedSeams) {
      state.certWeldedSeams = certWeldedSeams;
    },
    //добавление новых значений в хранилище []
    addCertWeldedSeam(state, certWeldedSeam) {
      state.certWeldedSeams.push(certWeldedSeam);
    },

    //обновление в хранилище []
    setCertWeldedConnections(state, certWeldedConnections) {
      state.certWeldedConnections = certWeldedConnections;
    },
    //добавление новых значений в хранилище []
    addCertWeldedConnection(state, certWeldedConnection) {
      state.certWeldedConnections.push(certWeldedConnection);
    },

    //обновление в хранилище []
    setCertWeldedPositions(state, certWeldedPositions) {
      state.certWeldedPositions = certWeldedPositions;
    },
    //добавление новых значений в хранилище []
    addCertWeldedPosition(state, certWeldedPosition) {
      state.certWeldedPositions.push(certWeldedPosition);
    },
    //обновление в хранилище []
    setCertAxesPositions(state, certAxesPositions) {
      state.certAxesPositions = certAxesPositions;
    },
    //добавление новых значений в хранилище []
    addCertAxesPosition(state, certAxesPosition) {
      state.certAxesPositions.push(certAxesPosition);
    },
    //обновление в хранилище []
    setCertWeldedJoints(state, certWeldedJoints) {
      state.certWeldedJoints = certWeldedJoints;
    },
    //добавление новых значений в хранилище []
    addCertWeldedJoint(state, certWeldedJoint) {
      state.certWeldedJoints.push(certWeldedJoint);
    },

    //обновление в хранилище []
    setCertBrands(state, certBrands) {
      state.certBrands = certBrands;
    },
    //добавление новых значений в хранилище []
    addCertBrand(state, certBrand) {
      state.certBrands.push(certBrand);
    },

    //обновление в хранилище []
    setCertElectrodes(state, certElectrodes) {
      state.certElectrodes = certElectrodes;
    },
    //добавление новых значений в хранилище []
    addCertElectrode(state, certElectrode) {
      state.certElectrodes.push(certElectrode);
    },

    //обновление в хранилище []
    setCertComissions(state, certComissions) {
      state.certComissions = certComissions;
    },
    //добавление новых значений в хранилище []
    addCertComission(state, certComission) {
      state.certComissions.push(certComission);
    },

    //обновление в хранилище []
    setCertControls(state, certControls) {
      state.certControls = certControls;
    },
    //добавление новых значений в хранилище []
    addCertControl(state, certControl) {
      state.certControls.push(certControl);
    },

    //обновление в хранилище []
    setCertVisuals(state, certVisuals) {
      state.certVisuals = certVisuals;
    },
    //добавление новых значений в хранилище []
    addCertVisual(state, certVisual) {
      state.certVisuals.push(certVisual);
    },

    //обновление в хранилище []
    setCertUltrasonicTestings(state, certUltrasonicTestings) {
      state.certUltrasonicTestings = certUltrasonicTestings;
    },
    //добавление новых значений в хранилище []
    addCertUltrasonicTesting(state, certUltrasonicTesting) {
      state.certUltrasonicTestings.push(certUltrasonicTesting);
    },

    //обновление в хранилище []
    setCertGrades(state, certGrades) {
      state.certGrades = certGrades;
    },
    //добавление новых значений в хранилище []
    addCertGrade(state, certGrade) {
      state.certGrades.push(certGrade);
    },

    //обновление в хранилище []
    setCertAccesses(state, certAccesses) {
      state.certAccesses = certAccesses;
    },
    //добавление новых значений в хранилище []
    addCertAccess(state, certAccess) {
      state.certAccesses.push(certAccess);
    },

    //обновление в хранилище []
    setCertAccessItems(state, certAccessItems) {
      state.certAccessItems = certAccessItems;
    },
    //добавление новых значений в хранилище []
    addCertAccessItem(state, certAccessItem) {
      state.certAccessItems.push(certAccessItem);
    },

    //обновление в хранилище []
    setCertTextHeads(state, certTextHeads) {
      state.certTextHeads = certTextHeads;
    },
    //добавление новых значений в хранилище []
    addCertTextHead(state, certTextHead) {
      state.certTextHeads.push(certTextHead);
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const dataload = {
          value: payload.values.newItem,
        };
        // link для запроса
        const link = payload.link;

        const data = await $api.post(`api/${link}/create`, dataload);

        dispatch(
          "setMessage",
          {
            value: "Новое значение успешно добавлено ",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        if (e.message === "Request failed with status code 400") {
          dispatch(
            "setMessage",
            {
              value: "Вероятно такое значение уже добавлено",
              type: "danger",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: e,
              type: "danger",
            },
            { root: true }
          );
        }

        throw e;
      }
    },
    async createSub({ commit, dispatch }, payload) {
      try {
        const dataload = {
          value: payload.values.newSubItem,
          certAccessId: payload.certAccessId,
        };
        // link для запроса
        const link = payload.link;

        const data = await $api.post(`api/${link}/create`, dataload);

        dispatch(
          "setMessage",
          {
            value: "Новое значение успешно добавлено ",
            type: "primary",
          },
          { root: true }
        );
      } catch (e) {
        if (e.message === "Request failed with status code 400") {
          dispatch(
            "setMessage",
            {
              value: "Вероятно такое значение уже добавлено",
              type: "danger",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: e,
              type: "danger",
            },
            { root: true }
          );
        }

        throw e;
      }
    },
    async load({ commit, dispatch }, link) {
      try {
        //загрузка с БД сервера
        const { data } = await $api.get(`/api/${link}`);

        const certItems = Object.keys(data).map((id) => ({
          ...data[id],
          id,
        }));

        //вызываем mutation setCert***s
        switch (link) {
          case "certificate-qualifying-rank":
            commit("setCertQualifyingRanks", certItems);
            break;
          case "certificate-welding-method":
            commit("setCertWeldingMethods", certItems);
            break;
          case "certificate-welded-type":
            commit("setCertWeldedTypes", certItems);
            break;
          case "certificate-welded-seam":
            commit("setCertWeldedSeams", certItems);
            break;
          case "certificate-welded-connection":
            commit("setCertWeldedConnections", certItems);
            break;
          case "certificate-attestation-type":
            commit("setCertAttestationTypes", certItems);
            break;
          case "certificate-welded-position":
            commit("setCertWeldedPositions", certItems);
            break;
          case "certificate-axes-position":
            commit("setCertAxesPositions", certItems);
            break;
          case "certificate-welded-joint":
            commit("setCertWeldedJoints", certItems);
            break;
          case "certificate-brand":
            commit("setCertBrands", certItems);
            break;
          case "certificate-electrode":
            commit("setCertElectrodes", certItems);
            break;
          case "certificate-comission":
            commit("setCertComissions", certItems);
            break;
          case "certificate-control":
            commit("setCertControls", certItems);
            break;
          case "certificate-grade":
            commit("setCertGrades", certItems);
            break;
          case "certificate-access":
            commit("setCertAccesses", certItems);
            break;
          case "certificate-access-item":
            commit("setCertAccessItems", certItems);
            break;
          case "certificate-text-head":
            commit("setCertTextHeads", certItems);
            break;
        }
      } catch (e) {
        if (e.message === "Request failed with status code 403") {
          dispatch(
            "setMessage",
            {
              value: "У вас недостаточно прав доступа",
              type: "danger",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: e,
              type: "danger",
            },
            { root: true }
          );
        }

        throw e;
      }
    },

    async remove({ commit, dispatch }, payload) {
      try {
        // link запроса
        const link = payload.link;

        // id для удаления
        const id = payload.id;

        if (id) {
          const data = await $api.delete(`/api/${link}/${id}`);

          dispatch(
            "setMessage",
            {
              value: "Значение успешно удалено",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Не выбрано значение для удаления",
              type: "danger",
            },
            { root: true }
          );
        }
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.message,
            type: "danger",
          },
          { root: true }
        );
      }
    },

    async update({ dispatch }, payload) {
      try {
        // link запроса
        const link = payload.link;
        // id
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = {
          value: payload.newValues.value,
        };

        if (id) {
          const data = await $api.patch(`/api/${link}/${id}`, dataload);

          dispatch(
            "setMessage",
            {
              value: "Значение успешно изменено",
              type: "primary",
            },
            { root: true }
          );
        } else {
          dispatch(
            "setMessage",
            {
              value: "Нет значения с таким id",
              type: "danger",
            },
            { root: true }
          );
        }
      } catch (e) {
        dispatch(
          "setMessage",
          {
            value: e.message,
            type: "danger",
          },
          { root: true }
        );
      }
    },
  },
  getters: {
    certQualifyingRanks(state) {
      return state.certQualifyingRanks;
    },
    certWeldingMethods(state) {
      return state.certWeldingMethods;
    },
    certWeldedTypes(state) {
      return state.certWeldedTypes;
    },
    certWeldedSeams(state) {
      return state.certWeldedSeams;
    },
    certWeldedConnections(state) {
      return state.certWeldedConnections;
    },
    certAttestationTypes(state) {
      return state.certAttestationTypes;
    },
    certWeldedPositions(state) {
      return state.certWeldedPositions;
    },
    certAxesPositions(state) {
      return state.certAxesPositions;
    },
    certWeldedJoints(state) {
      return state.certWeldedJoints;
    },
    certBrands(state) {
      return state.certBrands;
    },
    certElectrodes(state) {
      return state.certElectrodes;
    },
    certComissions(state) {
      return state.certComissions;
    },
    certControls(state) {
      return state.certControls;
    },
    certGrades(state) {
      return state.certGrades;
    },
    certAccesses(state) {
      return state.certAccesses;
    },
    certAccessItems(state) {
      return state.certAccessItems;
    },
    certTextHeads(state) {
      return state.certTextHeads;
    },
  },
};
