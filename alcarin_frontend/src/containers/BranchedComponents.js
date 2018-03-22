import { branch } from '../store/branch';
import TestComponent from '../components/Test';
import { increase } from '../store/actions';

export const Test = branch({ counter: 'counter' }, { increase }, TestComponent);
