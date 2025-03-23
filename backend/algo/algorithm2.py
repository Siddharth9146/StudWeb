def suggest_universities(universities:list, student:dict) -> list:
    """
    Suggest universities for a student based on various factors.
    The algorithm considers academic performance, degree preferences, facilities,
    location, and university ranking.
    
    Parameters:
    - universities: List of university information dictionaries
    - student: Dictionary containing student information and preferences
    
    Returns:
    - List of ranked universities
    """
    # Define normalized weights for university factors (total = 1)
    weights = {
        # Academic fit (total: 0.5)
        "academic_match": 0.2,      # How well the student's academic performance matches requirements
        "degree_match": 0.3,        # How well the university offers student's preferred degrees
        
        # Preferences & Quality (total: 0.5)
        "facilities_match": 0.15,   # How well the university facilities match student's preferences
        "location_match": 0.15,     # Whether the university is in the student's preferred state
        "rank_quality": 0.2,        # University's ranking and quality metrics
    }
    
    # Normalize campus size to avoid extreme values (typical campus sizes range from 10-1000 acres)
    def normalize_campus_size(size):
        # Cap at 1000 acres and normalize to 0-10 scale
        return min(size, 1000) / 100
    
    # Initialize a list to store ranked universities
    ranked_universities = []
    
    for uni in universities:
        # ====== 1. ACADEMIC MATCH ======
        academic_score = 0
        
        # Grade match - how well student's grades match university requirements
        grade_margin = student["twelfth_grade"] - uni["required_12th"]
        if grade_margin >= 0:
            # Student meets or exceeds requirements
            # Score increases as student exceeds requirements, but with diminishing returns
            academic_score += min(10, 5 + (grade_margin * 0.2))
        else:
            # Student below requirements - significant penalty
            academic_score -= min(10, abs(grade_margin) * 0.5)
            
        # Consider exam scores if available
        if "exam_score" in student and student["exam_score"] > 0:
            # Simple heuristic: high exam scores (>80) boost academic_score
            exam_bonus = max(0, (student["exam_score"] - 70) * 0.2)
            academic_score += exam_bonus
            
        # ====== 2. DEGREE MATCH ======
        degree_score = 0
        
        # Get student's preferred degrees
        student_degrees = student.get("preferred_degrees", [])
        if not isinstance(student_degrees, list):
            student_degrees = [student_degrees] if student_degrees else []
            
        # Get university's offered degrees
        uni_degrees = uni.get("degrees_offered", [])
        if not isinstance(uni_degrees, list):
            uni_degrees = [uni_degrees] if uni_degrees else []
        
        # Calculate degree match score
        if student_degrees and uni_degrees:
            common_degrees = set(student_degrees).intersection(set(uni_degrees))
            if common_degrees:
                # High importance: Perfect match gets 10 points
                match_ratio = len(common_degrees) / len(student_degrees)
                degree_score = 10 * match_ratio
        
        # ====== 3. FACILITIES MATCH ======
        facility_score = 0
        
        # Get student's preferred facilities
        student_facilities = student.get("preferred_facilities", [])
        if not isinstance(student_facilities, list):
            student_facilities = [student_facilities] if student_facilities else []
        
        # Get university's offered facilities
        uni_facilities = uni.get("facilities_offered", [])
        if not isinstance(uni_facilities, list):
            uni_facilities = [uni_facilities] if uni_facilities else []
        
        # Calculate facility match score
        if student_facilities and uni_facilities:
            common_facilities = set(student_facilities).intersection(set(uni_facilities))
            if common_facilities:
                # Medium importance: Perfect match gets 10 points
                match_ratio = len(common_facilities) / len(student_facilities)
                facility_score = 10 * match_ratio
        
        # Add bonus for larger campuses which typically have more facilities
        campus_size_bonus = normalize_campus_size(uni["campus_size"])
        facility_score += campus_size_bonus
        
        # ====== 4. LOCATION MATCH ======
        location_score = 0
        
        # State preference - significant bonus for matching state
        if student["state"] == uni["state"]:
            location_score = 10  # Full points for same state
        
        # ====== 5. UNIVERSITY QUALITY ======
        quality_score = 0
        
        # NIRF ranking is from 1-100, with lower being better
        # Convert to a 0-10 scale where 10 is the best (rank 1)
        if uni["nirf_ranking"] > 0:
            rank_score = max(0, 10 - (uni["nirf_ranking"] / 10))
            quality_score = rank_score
        
        # ====== FINAL SCORE CALCULATION ======
        # Calculate the weighted score (on a 0-10 scale)
        score = (
            weights["academic_match"] * academic_score +
            weights["degree_match"] * degree_score +
            weights["facilities_match"] * facility_score +
            weights["location_match"] * location_score +
            weights["rank_quality"] * quality_score
        )
        
        # Debug information - can be removed in production
        debug_info = {
            "academic": round(academic_score, 2),
            "degree": round(degree_score, 2),
            "facility": round(facility_score, 2),
            "location": round(location_score, 2),
            "quality": round(quality_score, 2),
            "final": round(score, 2)
        }
        
        # Uncomment to see score breakdown
        # print(f"University: {uni['name']}, Scores: {debug_info}")
        
        # Create a tuple with uni information and its score
        uni_info = (uni, score)
        
        # Append the tuple to the ranked_universities list
        ranked_universities.append(uni_info)
    
    # Sort the ranked universities based on their scores in descending order
    ranked_universities.sort(key=lambda x: x[1], reverse=True)
    print(ranked_universities)

    # remove the score from the list

    for i in range(len(ranked_universities)):
        ranked_universities[i] = ranked_universities[i][0]
        
    # Return the list of ranked universities
    return ranked_universities



