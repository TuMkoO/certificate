import $api from "../../axios/request";
import store from "../index";
import { ActionContext } from "vuex";
import type { ICertificateItem } from "@/types/ICertificateItem";

interface State {
  certTextHeads: ICertificateItem[];
  certQualifyingRanks: ICertificateItem[];
  certAttestationTypes: ICertificateItem[];
  certWeldingMethods: ICertificateItem[];
  certWeldedTypes: ICertificateItem[];
  certWeldedSeams: ICertificateItem[];
  certWeldedConnections: ICertificateItem[];
  certWeldedPositions: ICertificateItem[];
  certAxesPositions: ICertificateItem[];
  certWeldedJoints: ICertificateItem[];
  certBrands: ICertificateItem[];
  certElectrodes: ICertificateItem[];
  certComissions: ICertificateItem[];
  certControls: ICertificateItem[];
  certVisuals: ICertificateItem[];
  certUltrasonicTestings: ICertificateItem[];
  certGrades: ICertificateItem[];
  certAccesses: ICertificateItem[];
  certAccessItems: ICertificateItem[];
}

interface ICertificateItemPayload {
  certAccessId?: string;
  link: string;
  values: { newItem?: string; newSubItem?: string };
}

interface ICertificateItemEdit {
  id: string;
  link: string;
  newValues?: { value: string };
}

export default {
  namespaced: true,
  state(): State {
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
    };
  },
  mutations: {
    //обновление в хранилище setCertQualifyingRanks[]
    setCertQualifyingRanks(
      state: State,
      certQualifyingRanks: ICertificateItem[]
    ) {
      state.certQualifyingRanks = certQualifyingRanks;
    },
    //добавление новых значений в хранилище setCertQualifyingRanks[]
    addCertQualifyingRank(state: State, certQualifyingRank: ICertificateItem) {
      state.certQualifyingRanks.push(certQualifyingRank);
    },
    //обновление в хранилище []
    setCertAttestationTypes(
      state: State,
      certAttestationTypes: ICertificateItem[]
    ) {
      state.certAttestationTypes = certAttestationTypes;
    },
    //добавление новых значений в хранилище []
    addCertAttestationType(
      state: State,
      certAttestationType: ICertificateItem
    ) {
      state.certAttestationTypes.push(certAttestationType);
    },

    //обновление в хранилище []
    setCertWeldingMethods(
      state: State,
      certWeldingMethods: ICertificateItem[]
    ) {
      state.certWeldingMethods = certWeldingMethods;
    },
    //добавление новых значений в хранилище []
    addCertWeldingMethod(state: State, certWeldingMethod: ICertificateItem) {
      state.certWeldingMethods.push(certWeldingMethod);
    },

    //обновление в хранилище []
    setCertWeldedTypes(state: State, certWeldedTypes: ICertificateItem[]) {
      state.certWeldedTypes = certWeldedTypes;
    },
    //добавление новых значений в хранилище []
    addCertWeldedType(state: State, certWeldedType: ICertificateItem) {
      state.certWeldedTypes.push(certWeldedType);
    },

    //обновление в хранилище []
    setCertWeldedSeams(state: State, certWeldedSeams: ICertificateItem[]) {
      state.certWeldedSeams = certWeldedSeams;
    },
    //добавление новых значений в хранилище []
    addCertWeldedSeam(state: State, certWeldedSeam: ICertificateItem) {
      state.certWeldedSeams.push(certWeldedSeam);
    },

    //обновление в хранилище []
    setCertWeldedConnections(
      state: State,
      certWeldedConnections: ICertificateItem[]
    ) {
      state.certWeldedConnections = certWeldedConnections;
    },
    //добавление новых значений в хранилище []
    addCertWeldedConnection(
      state: State,
      certWeldedConnection: ICertificateItem
    ) {
      state.certWeldedConnections.push(certWeldedConnection);
    },

    //обновление в хранилище []
    setCertWeldedPositions(
      state: State,
      certWeldedPositions: ICertificateItem[]
    ) {
      state.certWeldedPositions = certWeldedPositions;
    },
    //добавление новых значений в хранилище []
    addCertWeldedPosition(state: State, certWeldedPosition: ICertificateItem) {
      state.certWeldedPositions.push(certWeldedPosition);
    },
    //обновление в хранилище []
    setCertAxesPositions(state: State, certAxesPositions: ICertificateItem[]) {
      state.certAxesPositions = certAxesPositions;
    },
    //добавление новых значений в хранилище []
    addCertAxesPosition(state: State, certAxesPosition: ICertificateItem) {
      state.certAxesPositions.push(certAxesPosition);
    },
    //обновление в хранилище []
    setCertWeldedJoints(state: State, certWeldedJoints: ICertificateItem[]) {
      state.certWeldedJoints = certWeldedJoints;
    },
    //добавление новых значений в хранилище []
    addCertWeldedJoint(state: State, certWeldedJoint: ICertificateItem) {
      state.certWeldedJoints.push(certWeldedJoint);
    },

    //обновление в хранилище []
    setCertBrands(state: State, certBrands: ICertificateItem[]) {
      state.certBrands = certBrands;
    },
    //добавление новых значений в хранилище []
    addCertBrand(state: State, certBrand: ICertificateItem) {
      state.certBrands.push(certBrand);
    },

    //обновление в хранилище []
    setCertElectrodes(state: State, certElectrodes: ICertificateItem[]) {
      state.certElectrodes = certElectrodes;
    },
    //добавление новых значений в хранилище []
    addCertElectrode(state: State, certElectrode: ICertificateItem) {
      state.certElectrodes.push(certElectrode);
    },

    //обновление в хранилище []
    setCertComissions(state: State, certComissions: ICertificateItem[]) {
      state.certComissions = certComissions;
    },
    //добавление новых значений в хранилище []
    addCertComission(state: State, certComission: ICertificateItem) {
      state.certComissions.push(certComission);
    },

    //обновление в хранилище []
    setCertControls(state: State, certControls: ICertificateItem[]) {
      state.certControls = certControls;
    },
    //добавление новых значений в хранилище []
    addCertControl(state: State, certControl: ICertificateItem) {
      state.certControls.push(certControl);
    },

    //обновление в хранилище []
    setCertVisuals(state: State, certVisuals: ICertificateItem[]) {
      state.certVisuals = certVisuals;
    },
    //добавление новых значений в хранилище []
    addCertVisual(state: State, certVisual: ICertificateItem) {
      state.certVisuals.push(certVisual);
    },

    //обновление в хранилище []
    setCertUltrasonicTestings(
      state: State,
      certUltrasonicTestings: ICertificateItem[]
    ) {
      state.certUltrasonicTestings = certUltrasonicTestings;
    },
    //добавление новых значений в хранилище []
    addCertUltrasonicTesting(
      state: State,
      certUltrasonicTesting: ICertificateItem
    ) {
      state.certUltrasonicTestings.push(certUltrasonicTesting);
    },

    //обновление в хранилище []
    setCertGrades(state: State, certGrades: ICertificateItem[]) {
      state.certGrades = certGrades;
    },
    //добавление новых значений в хранилище []
    addCertGrade(state: State, certGrade: ICertificateItem) {
      state.certGrades.push(certGrade);
    },

    //обновление в хранилище []
    setCertAccesses(state: State, certAccesses: ICertificateItem[]) {
      state.certAccesses = certAccesses;
    },
    //добавление новых значений в хранилище []
    addCertAccess(state: State, certAccess: ICertificateItem) {
      state.certAccesses.push(certAccess);
    },

    //обновление в хранилище []
    setCertAccessItems(state: State, certAccessItems: ICertificateItem[]) {
      state.certAccessItems = certAccessItems;
    },
    //добавление новых значений в хранилище []
    addCertAccessItem(state: State, certAccessItem: ICertificateItem) {
      state.certAccessItems.push(certAccessItem);
    },

    //обновление в хранилище []
    setCertTextHeads(state: State, certTextHeads: ICertificateItem[]) {
      state.certTextHeads = certTextHeads;
    },
    //добавление новых значений в хранилище []
    addCertTextHead(state: State, certTextHead: ICertificateItem) {
      state.certTextHeads.push(certTextHead);
    },
  },
  actions: {
    async create(
      { dispatch }: ActionContext<State, any>,
      payload: ICertificateItemPayload
    ) {
      try {
        const dataload = {
          value: payload.values.newItem,
        };
        // link для запроса
        const link = payload.link;

        await $api.post(`api/${link}/create`, dataload);

        dispatch(
          "setMessage",
          {
            value: "Новое значение успешно добавлено ",
            type: "primary",
          },
          { root: true }
        );
      } catch (e: any) {
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
    async createSub(
      { dispatch }: ActionContext<State, any>,
      payload: ICertificateItemPayload
    ) {
      try {
        const dataload = {
          value: payload.values.newSubItem,
          certAccessId: payload.certAccessId,
        };
        // link для запроса
        const link = payload.link;

        await $api.post(`api/${link}/create`, dataload);

        dispatch(
          "setMessage",
          {
            value: "Новое значение успешно добавлено ",
            type: "primary",
          },
          { root: true }
        );
      } catch (e: any) {
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
    async load({ commit, dispatch }: ActionContext<State, any>, link: string) {
      try {
        //загрузка с БД сервера
        const { data } = await $api.get<ICertificateItem[]>(`/api/${link}`);

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
      } catch (e: any) {
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

    async remove(
      { dispatch }: ActionContext<State, any>,
      payload: ICertificateItemEdit
    ) {
      try {
        // link запроса
        const link = payload.link;

        // id для удаления
        const id = payload.id;

        if (id) {
          await $api.delete(`/api/${link}/${id}`);

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
      } catch (e: any) {
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

    //for textHead
    async update(
      { dispatch }: ActionContext<State, any>,
      payload: ICertificateItemEdit
    ) {
      try {
        // link запроса
        const link = payload.link;
        // id
        const id = payload.id;
        // данные для передачи в БД на сервере
        const dataload = {
          value: payload.newValues?.value,
        };

        if (id) {
          await $api.patch(`/api/${link}/${id}`, dataload);

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
      } catch (e: any) {
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
    certQualifyingRanks(state: State) {
      return state.certQualifyingRanks;
    },
    certWeldingMethods(state: State) {
      return state.certWeldingMethods;
    },
    certWeldedTypes(state: State) {
      return state.certWeldedTypes;
    },
    certWeldedSeams(state: State) {
      return state.certWeldedSeams;
    },
    certWeldedConnections(state: State) {
      return state.certWeldedConnections;
    },
    certAttestationTypes(state: State) {
      return state.certAttestationTypes;
    },
    certWeldedPositions(state: State) {
      return state.certWeldedPositions;
    },
    certAxesPositions(state: State) {
      return state.certAxesPositions;
    },
    certWeldedJoints(state: State) {
      return state.certWeldedJoints;
    },
    certBrands(state: State) {
      return state.certBrands;
    },
    certElectrodes(state: State) {
      return state.certElectrodes;
    },
    certComissions(state: State) {
      return state.certComissions;
    },
    certControls(state: State) {
      return state.certControls;
    },
    certGrades(state: State) {
      return state.certGrades;
    },
    certAccesses(state: State) {
      return state.certAccesses;
    },
    certAccessItems(state: State) {
      return state.certAccessItems;
    },
    certTextHeads(state: State) {
      return state.certTextHeads;
    },
  },
};
