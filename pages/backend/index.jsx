import PageLayout from "@/components/PageLayout";
import PersonalDetails from "@/components/PersonalDetails";
import Section from "@/components/Section";

export default function BackendResume() {
	return (
		<PageLayout title="JAVA工程师">
			<PersonalDetails title="JAVA工程师"/>
			<Section title="TODO" subtitle="编织有艺术感的代码"/>
		</PageLayout>
	);
}
