import Seo from "./root"

const Root = (props) => {
    return (
        <>
            <Seo title={ props.title } />
            <div id={ "root-" + props.title.toLowerCase() }>
                { props.children }
            </div>
        </>
    )
}

export default Root