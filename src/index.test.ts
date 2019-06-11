import 'mocha';
import {index} from './index';
import {CGX} from './cgx';
import { expect } from 'chai';  
import { fail } from 'assert';

describe('index', () => {
    describe('getCGXInstance', () => {
        it('gets the CGX instance of the script', () => {
            try {
                const script = index();
                expect(script instanceof CGX);
            } catch (err) {
                fail();
            }
        }); 
    });
});