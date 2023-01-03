import Header from "./Header";
import Sidebar from "./Sidebar";
import GridContainer from "./GridContainer";

const Layout = ({ children }) => {
    return(
        <>
            <Header/>
            <Sidebar/>
            <GridContainer>
                {children}
            </GridContainer>
        </>
    )
}

export default Layout;