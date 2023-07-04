import { getBeerList, getBeerMetaData } from '../../api';
import { Beer, ApiParams, MetaData } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void,  params?: ApiParams, callback?: Function) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      setData(response.data);
    } catch (error) {
      handle(error);
    } finally {
      if (callback) {
        callback();
      }
    }
  })();
};

const fetchMetaData = (
  setMetaData: (data: MetaData) => void,
  params?: ApiParams
) => {
  (async () => {
    try {
      const response = await getBeerMetaData(params);
      setMetaData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, fetchMetaData };
