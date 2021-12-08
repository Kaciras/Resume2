import PageLayout from "@/components/PageLayout";
import PersonalDetails from "@/components/PersonalDetails";
import TitledSection from "@/components/TitledSection";

export default function BackendResume() {
	return (
		<PageLayout title="JAVA工程师">
			<PersonalDetails title="JAVA工程师"/>
			<TitledSection title="TODO" subtitle="编织有艺术感的代码"/>
		</PageLayout>
	);
}
