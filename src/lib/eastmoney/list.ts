import dayjs from "dayjs";

declare module List {
	export interface Diff {
		f12: string;
		f13: number;
		f14: string;
		f62: number;
	}

	export interface Data {
		total: number;
		diff: Diff[];
	}

	export interface RootObject {
		rc: number;
		rt: number;
		svr: number;
		lt: number;
		full: number;
		dlmkts: string;
		data: Data;
	}
}

const listUrl = `https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=500&po=1&np=1&fields=f12%2Cf13%2Cf14%2Cf62&fid=f62&fs=m%3A90%2Bt%3A2&ut=b2884a393a59ad64002292a3e90d46a5`;

export const list = async () => {
	const data = (await fetch(listUrl).then((res) =>
		res.json()
	)) as List.RootObject;
	return data.data.diff;
};

export const ListArray = async () => {
	const listData = await list();
	const category = listData.map((item) => item.f14);
	const value = listData.map((item) => item.f62);
	const codes = listData.map((item) => `${item.f12}`);
	return {
		time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
		category,
		value,
		codes
	};
};


declare module BkListArray {

    export interface Diff {
        f1: number;
        f2: number;
        f3: number;
        f12: string;
        f13: number;
        f14: string;
        f62: number;
        f66: number;
        f69: number;
        f72: number;
        f75: number;
        f78: number;
        f81: number;
        f84: number;
        f87: number;
        f124: number;
        f184: number;
        f204: string;
        f205: string;
        f206: string;
    }

    export interface Data {
        total: number;
        diff: Diff[];
    }

    export interface RootObject {
        rc: number;
        rt: number;
        svr: number;
        lt: number;
        full: number;
        dlmkts: string;
        data: Data;
    }

}

const BkListUrl = (code:string) => `https://push2.eastmoney.com/api/qt/clist/get?fid=f62&po=1&pz=5&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=b:${code}&fields=f12,f14,f2,f3,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f204,f205,f124,f1,f13`
export const BkListArray = async (code :string) => {
	const data = (await fetch(BkListUrl(code)).then((res) =>
		res.json()
	)) as BkListArray.RootObject;
	return data.data.diff;
}
