## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

    PureComponent skips re-rendering class componenet with same props and state. It is same as Component but with a custom shouldComponentUpdate method that shallowly compares props and state.
    For example if we pass from parent to child array. The equality will always give false and shouldComponentUpdate method will be called every time

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

    For Example we are changing context and in Parent component we have method shouldComponentUpdate and in Child method we have some dependencies on context. So Parents shouldComponentUpdate will block re-render and Child Component won't be re-rendered.

## 3. Describe 3 ways to pass information from a component to its PARENT.

    First way is described in technical task. In AutoComplete I am passing function setValue to AutoVariants component through property updateInput then in AutoVAriants I am calling this function from the child
    <li onClick={() => updateInput(variant.query)} key={index}>{transFormText(variant.query, value)}</li>)}

    Second way is to use Context. Cause whenever you change the context it changed for all components in Provider

    Third way is to use any state manager like redux. You are dispatching some event which changes general state and it reflects to all componetes which are using it

## 4. Give 2 ways to prevent components from re-rendering.

    First is to use React.memo. It prevents re-rendering when props stay the same

    Second is to use hooks useMemo and useCallback. useMemo memoize values if its dependency don't change and useCallback makes same but with function referrences

    And if you use class componets then you can use shouldComponentUpdate and re-render component only according some logic of state and props change in this method. Also you can use PureCompoent with predefined shouldComponentUpdate method which shallowly compares props and state.

    Also better not to pass to child componets properties which you are not using in them

## 5. What is a fragment and why do we need it? Give an example where it might break my app. 

    In JSX you can't return multiple elements. And without fragment we are wrapping multtiple elements in div

    <div>
        <input type="text" placeholder="Enter text..." value={value} onChange={handleChange} />
        {value && <AutoVariants value={value} updateInput={setValue}/>}
    </div>

    This cause unnecessary div nesting sometimes and if want to avoid it we can use fragments

    <>
        <input type="text" placeholder="Enter text..." value={value} onChange={handleChange} />
        {value && <AutoVariants value={value} updateInput={setValue}/>}
    </>

    so we don't need to have wraping div

## 6. Give 3 examples of the HOC pattern.

    HOC is a function which takes as an argument component and returns new component with extended functionality.

    function withHoc(WrappedComponent) {
    return function (props) {
        // some methods like loggining
        
        useEffect(() => {
        // Log data on update
        console.log(`Component ${WrappedComponent.name} updated.`);
        });
        
        return (
            <WrappedComponent {...props} />
        );
    };
    }

    const GeneralComponent = () => {
    return (
        <p>Some text</p>
    );
    };

    const GeneralComponentWithLogs = withHoc(GeneralComponent);

    HOCs are used to manage same behaviour for different components.
    For example:
    -	You need to decide what to do with different users authorization type. So you wright a HOC where you manage this and all components which need authorization logic can use this HOC
    -	Or you are handling different languages on front end side. So you are creating HOC which manages those translations
    -	Or you want to have same effect for different components. For example to change background onClick

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?
    for promise exception handling is described in technical task. fetch function returns promise. Exeption handled in catch method

    function getSuggestions(query: string): Promise<ApiResponse> {
        return fetch('test.json')
            .then((res) => res.json())
            .then((respData) => {
                return respData;
            })
            .catch((e) => {
                suggestionsCacheMap.delete(query);
                console.log(e);
            })
    }

    same but with async/await. Exceptions handling is done by wrapping code in try catch

    async function getSuggestions(query: string): Promise<ApiResponse> {
        try {
            const request = await fetch('test.json');
            return request.json()
        } catch(e) {
            suggestionsCacheMap.delete(query);
            console.log(e);
        }
    }

    in callbacks we need to define logic for errorHandling

    function fetchData(url, callback, errorCallback) {
        const isSuccess = // some code which handles that result is good

        setTimeout(() => {
            if (success) {
                callback(data);
            } else {
                errorCallback('Error happened');
            }
        }, 1000);
    }

    function successFunc(data) {
        console.log('Success');
    }

    function handleErrors(error) {
        console.log(error);
    }

    // Fetching data and handling potential errors
    fetchData('test.json', successFunc, handleErrors);

## 8. How many arguments does setState take and why is it async.

    setState is async because he doesn’t mutate state immediately and it creates pending transaction. Also it is batched. The state will mutate only when all setState transactions will proceed. setState has 2 arguments. Second argument is a callback function which will be called after current setState transaction will proceed.

## 9. List the steps needed to migrate a Class to Function Component.

    - change class to function
    - replace render method with return
    - replace this.setState with hook useState and remove constructor
    - convert all methods to functions
    - instead of component life cycle with useEffects variations
    - remove reference to this

## 10. List a few ways styles can be used with components.

    - inline CSS

    const GeneralComponent = () => {
    const textStyle = {color: "red"};
    return (
        <p style={textStyle}>Some text</p>
    );
    };

    - the way I made it in technical task. Creating separate css file and importing it inside the component

    - almost same thing but in css file name we can add .module.css and when we are importing it to some component it will be applied only for it so we don’t need to worry that we have same class names in different css files

    - also we can install separate npm modules for SASS or SCSS

## 11. How to render an HTML string coming from the server.
    use html-react-parser

    const parse = require('html-react-parser');
    const GeneralComponent = () => {
    return (
        <div>{parse(response)} </div>
    );
    };

    where response is response from server