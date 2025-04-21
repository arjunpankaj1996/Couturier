import { Grid , Container} from "@mantine/core";
import './login.css'
import LoginLeft from '../components/LoginLeft'
import LoginRight from "../components/LoginRight";

export function  LoginPage() {
  return (
    
    <Container fluid className="LoginContainer">
      <Grid columns={12} >
        <Grid.Col span={{xs:12 , sm:12 , md:6 , lg:6}}>
          <LoginLeft />
        </Grid.Col>
        <Grid.Col span={{xs:12 , sm:12 , md:6 , lg:6}}>
          <LoginRight />
        </Grid.Col>
      </Grid>
    </Container>  
  )
}