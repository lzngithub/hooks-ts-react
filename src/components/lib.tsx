import styled from '@emotion/styled'
import { Button } from 'antd'

// 单个元素
export const CustomButton = styled(Button)<{ bgColor?: string }>`
	background-color: ${(props) => (props?.bgColor ? props.bgColor : 'purple')};
	color: #fff;
	margin-left: 5px;
`

// 多个元素
export const CustomButton1 = (props: any) => {
	return (
		<div>
			<Button type={props.type}>查询</Button>
			<Button>重置</Button>
		</div>
	)
}
