import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Form, { FormLayout } from '@/components/Forms'
import SignIn from '@/components/SignIn'
import { useQuery } from 'react-query'
import Button from '@/components/Button'
import { getMemberChallengeDataNovember } from '@/util/api'

// Become a Contributor: Virtual Coffee Hacktoberfest Initiative

const intro = (
	<>
		<div className="text-center">
			<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
				Add your blog posts!
			</h1>
			<p className="mt-4 text-lg leading-6 text-gray-500">text goes here</p>
		</div>
	</>
)

{
	/* <Head>
			<title>Thank you for your interest!</title>
		</Head> */
}
const successView = (
	<div className="py-16 px-4  sm:px-6 lg:px-8 lg:py-24">
		<div className="relative max-w-2xl mx-auto">
			<div className="text-center">
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 flex justify-center">
					<span className="mr-4">🙌</span>
					<span>Post Updated!</span>
					<span className="ml-4">🙌</span>
				</h1>
				<div className="text-lg leading-6 text-gray-500">
					<p className="mt-4">
						<Button size="lg" href="/monthly-challenges/november">
							Back to Challenge Dashboard
						</Button>
					</p>
				</div>
			</div>
		</div>
	</div>
)

export default function Page() {
	const { data: session, status: sessionStatus } = useSession()
	const router = useRouter()
	const { error, message: errorMessage, rowId } = router.query

	const previousFormSubmission = useQuery(
		['memberChallengeDataNovember', rowId],
		getMemberChallengeDataNovember,
		{ enabled: sessionStatus === 'authenticated' }
	)

	console.log({ previousFormSubmission })

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return (
			<FormLayout
				title="Become a Hacktoberfest Contributor"
				description="Are you interested in participating in Hacktoberfest, but don't know where to start?"
			>
				<SignIn />
			</FormLayout>
		)
	}

	if (!(previousFormSubmission.isSuccess || previousFormSubmission.isError)) {
		return null
	}

	if (!previousFormSubmission.data) {
		return (
			<FormLayout
				title="We've ended submissions for 2021"
				description="Thank you for your interest, but we've ended submissions for this year. See you next year!"
			>
				<div className="text-center">
					<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
						We've ended submissions for 2021
					</h1>
					<p className="mt-4 text-lg leading-6 text-gray-500">
						Thank you for your interest, but we've ended submissions for this
						year.
					</p>
					<p className="mt-4 text-lg leading-6 text-gray-500">
						See you next year!
					</p>
				</div>
			</FormLayout>
		)
	}

	if (previousFormSubmission.isError) {
		return (
			<FormLayout
				title="We've ended submissions for 2021"
				description="Thank you for your interest, but we've ended submissions for this year. See you next year!"
			>
				<div className="mt-12">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin augue
					nisi, fermentum vitae, imperdiet a, auctor eu, mi. Nulla imperdiet
					molestie purus. Duis arcu dui, pretium in, molestie id, convallis
					eget, orci. Praesent eget purus. Nullam sed nunc. Etiam quis orci ac
					metus consectetuer consequat. Sed pulvinar aliquam sem. Vestibulum
					convallis. Pellentesque vestibulum dapibus est. Morbi iaculis. Morbi
					molestie molestie libero. Ut metus. Phasellus pulvinar. Aenean rutrum
					tristique neque. Morbi vulputate. Curabitur pretium, arcu a accumsan
					pretium, augue mi ullamcorper ligula, at tristique ligula purus quis
					mi. Etiam blandit arcu et lorem. Nam ligula. Aliquam nisi sem, euismod
					id, pharetra vitae, ullamcorper et, pede.
				</div>
			</FormLayout>
		)
	}

	return (
		<FormLayout title="November Monthly Challenge" description="YOLO">
			<Form
				session={session}
				previousFormSubmission={
					previousFormSubmission?.data?.success
						? previousFormSubmission.data.fields
						: null
				}
				errorMessage={error ? errorMessage : undefined}
				successView={successView}
				intro={intro}
				formKey="monthlyChallengeNovember"
				apiPath={`monthly-challenges/november/${rowId}`}
				method="PUT"
				fieldsetLegend="November Monthly Challenge Details"
			/>
		</FormLayout>
	)
}