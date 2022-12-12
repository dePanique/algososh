import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should render Button without text', () => {
    const component = renderer.create(
        <Button 
        />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should render Button with text', () => {
    const component = renderer.create(
        <Button 
            text='Hello world'
        />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should render Button with disabled props', () => {
    const component = renderer.create(
        <Button 
            disabled
        />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should render Button with isLoader props', () => {
    const component = renderer.create(
        <Button 
            isLoader
        />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

it('should called callback once onClick', async () => {
    const handleClick = jest.fn();

    const user = userEvent.setup();

    render(
            <Button 
                text='Button'
                onClick={handleClick}
                data-testid="testingButton"
            />
    )

    await user.click(screen.getByTestId("testingButton"));

    expect(handleClick).toHaveBeenCalledTimes(1);
})

