import * as system from './systemService';
import * as list from './listService';
import * as cart from './cartService';
import * as address from './addressService';


export default {
    ...system,
    ...list,
    ...cart,
  ...address
};


