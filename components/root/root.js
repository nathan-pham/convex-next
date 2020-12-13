import Seo from "./seo"


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