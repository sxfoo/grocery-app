// Function to convert async storage stored data: [{item object 1}, {item object 2}, ...]
// to section list stored data for rendering purposes: [{"category": "Uncategorised", "data": [[Object]]}, {"category": "Household", "data": [[Object]]}, ... ]
export const TransformDataForSectionList = (dataArray) => {

    // TransformedDataArray holds not completed items =>  [{"category": "Uncategorised", "data": [[Object]]}, {"category": "Household", "data": [[Object]], ...}
    // completedItems holds completed items in an array [{item1}, {item2} ...]
    const transformedDataArray = [];
    const completedItems = [];

    // For every item in dataArray...
    for (const item of dataArray) {

        // Get category and completion status of the item & find if item category exists in transformedDataArray
        const { category, completed } = item;
        const existingSection = transformedDataArray.find((section) => section.category === category);

        // If item is completed, push the item into completedItems array
        // Open a new category section in transformedDataArray if it does not exist (this is to maintain order)
        if (completed) {
            completedItems.push(item);

            if (!existingSection) {
                transformedDataArray.push({ category, data: [] });
            }
        } 
        
        // If item is not completed, push the item into the category section (if existing)
        // Open a new category section in transformedDataArray if it does not exist
        else {
            if (existingSection) {
                existingSection.data.push(item);
            } else {
                transformedDataArray.push({ category, data: [item] });
            }
        }
    }

    // Push the completed category at the very end
    transformedDataArray.push({ category: 'Completed', data: completedItems });

    // If the section category has empty data array = > [], remove the section
    const filteredTransformedDataArray = transformedDataArray.filter(
        (section) => section.data.length > 0
    );

    return filteredTransformedDataArray;
};