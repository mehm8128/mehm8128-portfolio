import { NextResponse } from 'next/server'

export interface DeployDateTimeResponse {
	deployDateTime: string
}

export function GET(): NextResponse<DeployDateTimeResponse> {
	const deployDateTime = new Date().toISOString()
	return NextResponse.json({ deployDateTime })
}
