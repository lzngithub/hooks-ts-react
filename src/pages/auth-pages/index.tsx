import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import styled from '@emotion/styled'
import { NoPage } from './404'
import { Home } from './home'
import { Emotion } from './emotion'
import { TestApi } from './testApi'

export const AuthPages = () => {
	return (
		<Container>
			该页面访问需要权限
			<Router>
				<Main>
					<Routes>
						<Route>
							<Route path={'/home'} element={<Home />}></Route>
							<Route path={'/emotion'} element={<Emotion name='li' age={18} />}></Route>
							<Route path={'/test-api'} element={<TestApi />}></Route>
							<Route path='*' element={<Navigate to='/home' />} />
						</Route>
					</Routes>
				</Main>
			</Router>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`

const Main = styled.main<{ isStudent?: boolean }>`
	flex: 1;
	padding: 0;
	overflow: hidden;
	${(props) =>
		props.isStudent
			? `
      background-position: center bottom;
      background-size: 90% auto;
      background-color: #F1F5F8;
    `
			: null}
`
