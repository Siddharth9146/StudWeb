def suggest_universities(universities:list, student:dict) -> list:
    # Define weights for university factors (adjust as needed)
    weights = {
        "campus_size": 0.1,
        "facilities_score": 0.1
    }
    
    # Initialize a list to store ranked universities
    ranked_universities = []
    
    for uni in universities:
        # Calculate a score for each uni based on university factors
        score = (
            weights["campus_size"] * uni["campus_size"] +
            weights["facilities_score"] * uni["facilities_score"]
        )
        #adjust score based on nirf_ranking with lesser the better
        score += 0.2 * (100 - uni["nirf_ranking"])
        
        # Adjust the score based on student preferences (state and preferred_degree)
        if student["state"] == uni["state"]:
            score += 15  # Add a preference bonus for the same state
            
        if student["preferred_degree"] == uni["degrees_best"]:
            score += 20  # Add a preference bonus for the preferred degree
        
        # Adjust the score based on the required 12th grade percentage
        if student["twelfth_grade"] >= uni["required_12th"]:
            score += 20  # Add a bonus for meeting or exceeding the requirement
        
        # Create a tuple with uni information and its score
        uni_info = (uni, score)
        
        # Append the tuple to the ranked_universities list
        ranked_universities.append(uni_info)
    
    # Sort the ranked universities based on their scores in descending order
    ranked_universities.sort(key=lambda x: x[1], reverse=True)
    
    # Return the list of ranked universities
    return ranked_universities



