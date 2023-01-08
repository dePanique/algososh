import { Circle } from './circle';
import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

describe('Circle tests', () => {
    it('should render Circle without text', () => {
        const tree = renderer
        .create(
            <Circle />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle without text', () => {
        const tree = renderer.create(
            <Circle letter='qwerty'/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with null in head prop', () => {
        const tree = renderer.create(
            <Circle head={null}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with head prop', () => {
        const tree = renderer.create(
            <Circle head='head'/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with react-element in head', () => {
        const tree = renderer.create(
            <Circle head={<Circle />}/>
        ).toJSON();
    
        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with null in tail', () => {
        const tree = renderer.create(
            <Circle tail={null} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with tail', () => {
        const tree = renderer.create(
            <Circle tail="tail" />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with react-element in tail', () => {
        const tree = renderer.create(
            <Circle tail={<Circle />} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with index', () => {
        const tree = renderer.create(
            <Circle index={14} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle with prop isSmall===true', () => {
        const tree = renderer.create(
            <Circle isSmall />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle default state', () => {
        const tree = renderer.create(
            <Circle state={ElementStates.Default} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle changing state', () => {
        const tree = renderer.create(
            <Circle state={ElementStates.Changing} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle modified state', () => {
        const tree = renderer.create(
            <Circle state={ElementStates.Modified} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render Circle modified state', () => {
        const tree = renderer.create(
            <Circle state={ElementStates.Modified} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
})