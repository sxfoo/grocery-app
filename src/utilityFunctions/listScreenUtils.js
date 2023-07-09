export const TransformDataForSectionList = (dataArray) => {

    // Group the data by category
    const transformedDataArray = dataArray.reduce((acc, item) => {
        const { category } = item;
        const sectionIndex = acc.findIndex(section => section.category === category);

        if (sectionIndex !== -1) {
            acc[sectionIndex].data.push(item);
        } else {
            acc.push({ category: category, data: [item] });
        }

        return acc;
    }, []);

    return transformedDataArray;
}