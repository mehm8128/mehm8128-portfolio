import { NextResponse } from 'next/server'

export interface DeployDateTimeResponse {
	deployDateTime: string
}

export async function GET(): Promise<NextResponse<DeployDateTimeResponse>> {
	const deployDateTime = new Date().toISOString()
	return NextResponse.json({ deployDateTime })
}
